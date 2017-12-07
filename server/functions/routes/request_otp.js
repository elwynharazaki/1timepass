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

   admin.auth().createUser({ uid: phone })
      .then((user) => {
         const number = Math.random() * 8999 + 1000;
         const code = Math.floor(number);

         const body = {
            "destination": phone,
            "text": "Your code is: " + code,
         }
         
         axios({
            method: "POST",
            url: "https://mesabot.com/api/v2/send",
            data: body,
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
      })
      .catch(() => {
         if (err) {
            admin.auth().getUser( phone )
            .then((userRecord) => {
               const number = Math.random() * 8999 + 1000;
               const code = Math.floor(number);

               const body = {
                  "destination": phone,
                  "text": "Your code is: " + code,
               }
               
               axios({
                  method: "POST",
                  url: "https://mesabot.com/api/v2/send",
                  data: body,
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
                     });
               });
            })
         }
      })
}