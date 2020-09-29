const admin = require('firebase-admin');

const serviceAccount = require('../key/key.json') 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://signsafe-62b14.firebaseio.com"
});

const db = admin.firestore

// TODO : FIND FIREBASE CONFIG


module.exports = {admin, db}