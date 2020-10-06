const functions = require('firebase-functions');
const {db, admin} = require('../utils/admin')
const {firebase} = require('../utils/firebase')


exports.testing = async (req, res) => {
	// Take the text parameter passed to this HTTP endpoint and insert it into 
// Cloud Firestore under the path /messages/:documentId/original
  // Grab the text parameter.
  const original = req.body.text;
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've succesfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
};

exports.hello = async(req, res) => {
	res.send('hello')
}
