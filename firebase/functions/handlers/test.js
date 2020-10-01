const functions = require('firebase-functions');
const {db, admin} = require('../utils/admin')
const {firebase} = require('../utils/firebase')
const {isEmpty, isEmail} = require('../utils/helper');


// Add user

// generate code for user id.
function makeCode(length) {
	let result = '';
	const characters = '0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
		Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}


const menu = {
	food: [
	   {
		  id: '',
		  type: '',
		  name: '',
		  price: 0,
		  desc: '',
		  ingredients: [],
		  img: '',
	   }
	],
	drinks: [
	   {
		  id: '',
		  type: '',
		  name: '',
		  price: 0,
		  desc: '',
		  ingredients: [],
		  img: '',
	   }
	],
	specials: [
	   {
		  id: '',
		  name: '',
		  type: '',
		  price: 0,
		  desc: '',
		  ingredients: [],
		  img: '',
		  validUntil: ''
	   }
	]
 }

exports.addUser = async (req, res) => {
	const body = req.body;

	// userLevel: 1 = signSafe, 2 = menyr, 3 = btlr.
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		userLevel: 1,
		companyName: req.body.companyName,
		orgNumber : req.body.orgNumber

	}
	// Valdidate data.
	// let errors = {};
	// if (isEmpty(newUser.email)) {
	// 		errors.email = 'Must not be empty';
	// } else if (!isEmail(newUser.email)) {
	// 		errors.email = 'Must be a valid email address';
	// }
	// if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
	// if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Passwords must match.';
	// if (isEmpty(newUser.companyName)) errors.companyName = 'Must not be empty';
	// // If there is any error with the user input data, send the error object back.
	// if (Object.keys(errors).length > 0) {
	// 		return res.status(400).json(errors);
	// }
	let token,
    userId
	db()
	.doc(`/org/${newUser.companyName}`)
	.get()
	.then(doc => {
		// Check if doc excists.
		if(doc.exists) {
			return res.status(500).json({Org: `Business with name ${newUser.companyName} already exists!`})
		} else {
		// Create user   
		return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
		}
	})
	.then(data => {
		userId = data.user.uid;
		return data.user.getIdToken();
	})
	.then(idToken =>  {
		token = idToken;
		const userCred = {
			refCode: makeCode(4),
			email: newUser.email,
			orgNumber: newUser.orgNumber,
			companyName: newUser.companyName,
			userLevel: newUser.userLevel,
			createdAt: new Date(),
			userId : userId,
			menu: []	
		};
		return db().doc(`/org/${newUser.companyName}`).set(userCred)
	})
	.then(() => {
		return res.status(200).json({message: 'Created new user', token: token})
	})
	.catch(err => {
		console.log(err)
	})

}

exports.register = async (req, res) => {
	const body = req.body;
	const orgId = req.params.id;

	const visitInfo = {
		name: body.name,
		email: body.email,
		phone: body.phone,
		time_of_first_visit: new Date(),
		orgName: orgId
	}

	db().collection('org').doc(visitInfo.orgName).get()
	.then(doc => {
		if (doc.exists) {
			const orgData = doc.data()
			const menu = doc.data().menu;
			const refCode = doc.data().refCode
			// Register visits at org.
			// Check if user exists!
			db().collection('org').doc(visitInfo.orgName).collection('visits').doc(visitInfo.name).get()
			.then(doc => {
				if(doc.exists) {
					// If it exists , update.
					db()
						.collection('org')
						.doc(visitInfo.orgName)
						.collection('visits')
						.doc(visitInfo.name)
						.update({
							additionalVisits : admin.firestore.FieldValue.arrayUnion(visitInfo)
						})
						.catch(err =>{
							console.log(err)
						})
				} else {
					// If it does not exist, create
					db().collection('org').doc(visitInfo.orgName).collection('visits').doc(visitInfo.name)
					.set(visitInfo)

				}
				return null
			})

			.then(data => {
				return res.status(200).json({messge: 'User reg.', visitInfo})
			})
			.catch(err => {
				console.log(err)
				res.status(500).json({error: err})
			})
		} else {
			res.status(500).json({error: 'Org finnes ikke'})
		}
		return null
	}).catch(err => res.satus(500).json({error : err}))
	
	

	
	// const svar = await docRef.set({
	// 	first: 'Ada',
	// 	last: 'Lovelace',
	// 	born: 1815
	// }).catch(err => {
	// 	console.log(err)
	// 	return err;
	// });
	
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