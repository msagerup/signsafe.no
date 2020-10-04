// const express = require('express');
// const app = express();

// const {firebase} = require('./utils/firebase')

// // DialogFlow fulfillment
// const dfff = require('dialogflow-fulfillment');


// const admin = require('firebase-admin');
// const functions = require('firebase-functions');
// const cors = require('cors')({ origin: true});
// const serviceAccount = require('./key/key.json') 


// try {
// 	admin.initializeApp({
// 		credential: admin.credential.cert(serviceAccount),
// 		databaseURL: "https://signsafe-62b14.firebaseio.com"
// 	});
	
// } catch (error) {
// 	console.log('Err', error)
// }

// const db = admin.firestore()



// exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

// 	const agent = new dfff.WebhookClient({
// 		request : req,
// 		response : res
// 		});

// 		function demo (agent) {
// 			agent.add('Sending response from webhook server');
// 			agent.add('demo, demo demo')

// 		}

// 		let intentMap = new Map();
// 		intentMap.set('WebHookDemo', demo)

// 		agent.handleRequest(intentMap);


// });




// // // set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\ploon\Downloads\dialogkey.json

// // app.get('/test', (req, res) => {
// // 	res.send('We are live');
// // });


// // app.post('/', express.json(), (req, res) => {



// // 	const agent = new dfff.WebhookClient({
// // 		request : req,
// // 		response : res
// // 	});
	
// // 	function demo (agent) {
// // 		agent.add('Sending response , live from my server');

// // 		return db().collection('bootchat').add({
// // 			name: 'Guest1',
// // 			email: 'dsfsf@online.no'
// // 		}).then(doc => {
// // 			console.log('meeting added')
// // 		})

// // 	}
	
// // 	let intentMap = new Map();
// // 	intentMap.set('WebHookDemo', demo)
	
// // 	agent.handleRequest(intentMap);
	
// // })


// const port = 4444;

// app.listen(port,()=> {
// 	console.log('Live at port ' + port);
// })
// // old url webhook, from dialog flow.  https://us-central1-signsafe-62b14.cloudfunctions.net/dialogflowFirebaseFulfillment 