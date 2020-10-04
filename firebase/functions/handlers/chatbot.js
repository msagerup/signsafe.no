const functions = require('firebase-functions');
const { SessionsClient } = require('dialogflow');
const {db, admin} = require('../utils/admin')
const {WebhookClient} = require('dialogflow-fulfillment');
const cors = require('cors');
const serviceAccount = require('../key/key.json') 



exports.dialogflowGateway = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { queryInput, sessionId } = request.body;


    const sessionClient = new SessionsClient({ credentials: serviceAccount  });
    const session = sessionClient.sessionPath('signsafe-62b14', sessionId);


    const responses = await sessionClient.detectIntent({ session, queryInput});

    const result = responses[0].queryResult;

    response.send(result);
  });
});







exports.dialogflowWebhook = functions.https.onRequest(async (request, response) => {

	try {
	const agent = new WebhookClient({ request, response });

	const result = req.body.queryResult;

	async function userOnboardingHandler(agent) {

	 // Do backend stuff here
	 const db = admin.firestore();
	 const profile = db.collection('users').doc('jeffd23');

	//  const { name, color } = result.parameters;

		await profile.set({ name, color })
		agent.add(`Welcome aboard my friend!`);
	}


	let intentMap = new Map();
	intentMap.set('WebHookDemo', userOnboardingHandler);
	agent.handleRequest(intentMap);
	} catch (error) {
	 console.log(error)
 }

});




// set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\ploon\Downloads\dialogkey.json