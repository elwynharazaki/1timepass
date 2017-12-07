const admin = require('firebase-admin');
const Phone = require('phone');
const axios = require('axios');

const mesabot = require('./../secret/mesabotkey');

module.exports = (req, res) => {
   if (!req.body.phone) {
      return res
         .status(422)
         .send({ message: "Please enter your phone number" });
   }

   const phone = String(req.body.phone)
                  .replace(/[^\d]/g,'');

   admin.auth().getUser(phone)
      .then((userRecord) => {
         const number = Math.random() * 8999 + 1000;
         const code = Math.floor(number);

         axios({
            method: "POST",
            url: "https://mesabot.com/api/v2/send",
            data: {
               "destination": phone,
               "text": "Your Code is: " + code,
            },
            headers: mesabot
          })
         .then(() => {
            admin.database().ref('users/' + phone)
            .update({ code: code, valid: true })
               .then(() => {
                  res.send({ message: 'Code has been sent'});
               })
               .catch((error) => {
                  res.status(422).send(error);
               })
         })
         .catch((error) => {
            res.status(422).send(error);
         })
      })
      .catch(() => {
         admin.auth().createUser({ uid: phone })
         .then((user) => {
            return res.status(201).send(user);
         })
         .catch((error) => {
            return res.status(422).send(error);
         });
      });
}