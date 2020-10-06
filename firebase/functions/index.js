const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
const { SessionsClient } = require('dialogflow');
const serviceAccount = require('./key/key.json') 
const admin = require('firebase-admin');
app.use(cors);

					
const {register, addUser} = require('./handlers/users');
const {costumerLeads} = require('./handlers/order_info');
const {testing,hello} = require('./handlers/test')

app.post('/test', testing)
app.post('/hello', hello)





// todo: Import rutes
app.post('/register/:id', register)
app.post('/newuser', addUser)
app.post('/leads', costumerLeads)
// app.post('/bot', dialogflowWebhook )
// app.post('/chatter', dialogflowGateway)



const runtimeOpts = {
  timeoutSeconds: 530,
  memory: '1GB'
}

exports.api = functions
.runWith(runtimeOpts)
.region('europe-west1').https.onRequest(app);