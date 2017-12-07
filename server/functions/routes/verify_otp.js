const admin = require('firebase-admin');

module.exports = (req, res) => {
   if(!req.body.phone || !req.body.code) {
      return res.status(422).send({
         message: 'Please enter Phone number and Code'
      });
   }

   const phone = String(req.body.phone)
                  .replace(/[^\d]/g, '');

   const code = parseInt(String(req.body.code)
                  .replace(/[^\d]/g, ''));

   admin.auth().getUser(phone)
      .then((userRecord) => {
         const ref = admin.database().ref('users/' + phone );

         ref.on('value', (snapshot) => {
            ref.off();

            const userData = snapshot.val();

            if(userData.code !== code) {
               return res.status(422).send({
                  message: 'Invalid Code'
               })
            }

            if(!userData.valid) {
               return res.status(422).send({
                  message: 'Code has been used'
               })
            }

            ref.update({ valid: false })

            admin.auth().createCustomToken(phone)
               .then((token) => {
                  res.send({ token: token });
               })
         })
      })
      .catch((error) => {
         return res.status(422).send(error);
      });
}