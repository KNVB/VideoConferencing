const express = require('express');
const meetingObj =require('../classes/Meeting');
const router = express.Router();
const userObj =require('../classes/User');
const { v4: uuidv4 } = require('uuid');
router.post('/', (req, res, next) => {
  const body = req.body;
  var meeting=new meetingObj();
  var userId=uuidv4(),meetingId=uuidv4();
  var user=new userObj();
  user.id=userId;
  user.alias=body.alias;
  user.shareMedia={"video":body.shareVideo,"audio":body.shareAudio};
  meeting.setMeetingId(meetingId);
  meeting.setHostMember(user);
  meeting.setPassword(body.meetingPwd);
  body.userList[userId]=user;
  body.meetingList[meetingId]=meeting;
  res.send({"user":user,"meetingId":meetingId});
  res.end();
})
module.exports = router