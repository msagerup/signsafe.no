const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
const { SessionsClient } = require('dialogflow');
const serviceAccount = require('./key/key.json') 
const admin = require('firebase-admin');
app.use(cors);

// const {register, addUser} = require('./handlers/test')
// const {dialogflowWebhook, dialogflowGateway} = require('./handlers/chatbot')


// Dialog Flow
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://signsafe-62b14.firebaseio.com"
})


exports.dialogflowGateway = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { queryInput, sessionId } = request.body;

		try {

    const sessionClient = new SessionsClient({ credentials: serviceAccount  });
    const session = sessionClient.sessionPath('signsafe-62b14', sessionId);


    const responses = await sessionClient.detectIntent({ session, queryInput});

    const result = responses[0].queryResult;

		response.send(result);
		} catch (error) {
			console.log(error)
		}
  });
});




// // todo: Import rutes
// app.post('/register/:id', register)
// app.post('/newuser', addUser)
// app.post('/bot', dialogflowWebhook )
// // app.post('/chatter', dialogflowGateway)



const runtimeOpts = {
  timeoutSeconds: 530,
  memory: '1GB'
}

exports.api = functions
.runWith(runtimeOpts)
.region('europe-west1').https.onRequest(app);