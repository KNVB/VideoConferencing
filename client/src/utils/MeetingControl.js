import LocalStreamManager from './LocalStreamManager';
class MeetingControl{
    constructor(meetingInfo){
        var cancelJoinReqHandler=new Map();
        var joinReqHandler=new Map();
        var leaveMeetingHandler=new Map();        
        var localStreamUpdateHandler=new Map();
        var meetingCloseHandler=new Map();
        var newUserJoinHandler=new Map();
        var receiveMsgHandler=new Map();
        var resetRemoteStreamHandler=new Map();
        var userLeftHandler=new Map();
        var userJoinHandler=new Map();

        const localStreamManager=new LocalStreamManager();
        const meetingId=meetingInfo.meetingId;
        var localStream=null;
        
        var userList={};
        var user=meetingInfo.user;


    }
}
export default MeetingControl;
