const functions = require('firebase-functions');
const {db, admin} = require('../utils/admin')
const {isEmpty, isEmail} = require('../utils/helper');



// Add user

// generate code for user id.
function makeCode(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
			result += characters.charAt(
					Math.floor(Math.random() * charactersLength)
			);
	}
	return result;
}


exports.addUser = async (req, res) => {
	const body = req.body;

	// userLevel: 1 = signSafe, 2 = menyr, 3 = btlr.
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		userLevel: 1,
		companyName: req.body.companyName
	}
	// Valdidate data.
	let errors = {};
	if (isEmpty(newUser.email)) {
			errors.email = 'Must not be empty';
	} else if (!isEmail(newUser.email)) {
			errors.email = 'Must be a valid email address';
	}
	// if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
	// if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Passwords must match.';
	// if (isEmpty(newUser.companyName)) errors.companyName = 'Must not be empty';
	// If there is any error with the user input data, send the error object back.
	if (Object.keys(errors).length > 0) {
			return res.status(400).json(errors);
	}



	res.send(body)
}



exports.changer = async (req, res) => {
	const body = req.body;
	const docRef = db().collection('users').doc('alovelace');
	const propertyName = db().collection('locations').doc('butikk1');
	
	const doc = await propertyName.get()
	
	if (doc.exists) {
		const menu = doc.data();
		res.send({a: 'finnes', data: menu});
	} else {
		res.status(500).json({error: 'finnes ikke'})
	}
	


	
	const svar = await docRef.set({
		first: 'Ada',
		last: 'Lovelace',
		born: 1815
	}).catch(err => {
		console.log(err)
		return err;
	});
	
	};






exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've succesfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log('Uppercasing', context.params.documentId, original);
      
      const uppercase = original.toUpperCase();
      
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Cloud Firestore.
      // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });