const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
app.use(cors);

// Import rutes

const {addMessage, makeUppercase, helloWorld, changer, addUser } = require('./handlers/test')

app.post('/test', changer)
app.post('/newuser', addUser)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


const runtimeOpts = {
  timeoutSeconds: 600,
  memory: '1GB'
}

exports.api = functions
.runWith(runtimeOpts)
.region('europe-west1').https.onRequest(app);