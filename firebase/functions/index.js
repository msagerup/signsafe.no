const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
app.use(cors);

// Import rutes

const {addMessage, makeUppercase, helloWorld, changer, addUser } = require('./handlers/test')

app.post('/test', changer)
app.post('/newuser', addUser)



const runtimeOpts = {
  timeoutSeconds: 530,
  memory: '1GB'
}

exports.api = functions
.runWith(runtimeOpts)
.region('europe-west1').https.onRequest(app);