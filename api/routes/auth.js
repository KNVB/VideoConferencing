const express = require('express');
const router = express.Router();
router.post('/', (req, res, next) => {
	var body=req.body;
	var userId=body.userId,meetingId=body.meetingId;
	var userList =body.userList;
	var meetingList=body.meetingList;
	
	if (Object.keys(userList).includes(userId) &&
		Object.keys(meetingList).includes(meetingId)) {
		console.log("Jo");	
		return true
	} else {
		const err = new Error('invalid access')
		err.unauthorized = true
		throw err;
	}		
});
module.exports = router