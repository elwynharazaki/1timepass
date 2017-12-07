const functions = require('firebase-functions');
const admin = require('firebase-admin');

const requestOtp = require('./routes/request_otp');
const verifyOtp = require('./routes/verify_otp');

const serviceAccount = require("./secret/firebaseadminkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://timepass-ed7e0.firebaseio.com"
});

exports.requestOtp = functions.https.onRequest(requestOtp);
exports.verifyOtp = functions.https.onRequest(verifyOtp);