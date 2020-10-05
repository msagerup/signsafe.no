const functions = require('firebase-functions');
const {db,admin} = require('../utils/admin')
const {firebase} = require('../utils/firebase')
const {isEmpty, isEmail} = require('../utils/helper');


exports.costumerLeads = async (req, res) => {
	const {email, firstName, lastName, sendMessage, option} = req.body;
	const costumerInfo = {
		email, 
		firstName,
		lastName,
		option,
		message: sendMessage
	}

	console.log(req.body)

	try {
	db().collection('leads').doc(costumerInfo.lastName)
	.set(costumerInfo)
	.then(() => {
		return res.status(200).json({message: 'Lead created', costumerInfo})
	})
	.catch(error => {
		res.send(500).json({error})
	}).catch(err => res.send(500).json({err}))
} catch (error) {
	res.send(500).json({error})
	console.log(error)
} 
}
