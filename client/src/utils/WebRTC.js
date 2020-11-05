import config from './config';
import io from 'socket.io-client';
class WebRTC {
    constructor(){
        var configuration = {iceServers: 
            [{urls: "stun:stun.stunprotocol.org"},
             {urls: "stun:stun.l.google.com:19302"},
             {urls: "turn:numb.viagenie.ca", credential: "turnserver", username: "sj0016092@gmail.com"}		
            ]};
            
        var dataChannel=null;
        var dataChannelOpenHandler=null;
        var eventMsgLogger=null;
        var localStream=null;
        var peerConnection=null;
        var socket=io.connect(config.SOCKET_URL);
        var trackEventHandler=null;
        
        this.call=async()=>{
            await peerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
                iceRestart:true
              })
            .then (async offer=>{
                await peerConnection.setLocalDescription(offer)
                .then(()=>{
                    socket.emit("sendOffer",offer);
                })
                .catch (error=>{
                    throw error;
                })
            })
            .catch (reason=>{
                throw new Error(reason);
            })
        }
        this.init=()=>{
            createConnection();
        }
        this.hangUp=()=>{
            closeConnection();
        }       
        this.setDataChannelOpenEventHandlder=(handler)=>{
            dataChannelOpenHandler=handler;
        }
        this.setLocalStream=stream=>{
            localStream=stream;
        }
        this.setMsgLogger=(logger)=>{
            eventMsgLogger=logger;
        }        
        this.setTrackEventHandler=(handler)=>{
            trackEventHandler=handler;
        }
        this.updateLocalStream=()=>{
            updateLocalStream();
        }

/*========================================================================================================*/				
/*        private method                                                                                  */ 
/*========================================================================================================*/				        
        function updateLocalStream(){
            if (localStream.srcObject){
                localStream.srcObject.getTracks().forEach(track=>{
                    peerConnection.addTrack(track);
                })
            }
        }
        function createConnection(){
            peerConnection=new RTCPeerConnection(configuration);
            peerConnection.onconnectionstatechange = connectionStateChangeHandler;
            peerConnection.ondatachannel = dataEventMsgLogger;
            peerConnection.onicecandidate=iceCandidateEventHandler;
            peerConnection.oniceconnectionstatechange = iceConnectionStateChangeHandler;
            peerConnection.onicegatheringstatechange =iceGatheringStateChangeHandler;
            peerConnection.onnegotiationneeded=negotiationEventHandler;
            peerConnection.onsignalingstatechange=signalingStateChangeHandler;
            peerConnection.ontrack=trackEventHandler;

            dataChannel= peerConnection.createDataChannel('chat');
            eventMsgLogger("Connection object created");
        }
        async function closeConnection() {
			if (dataChannel){
                dataChannel.close();
            }
            if (peerConnection){
				peerConnection.onconnectionstatechange = null;
				peerConnection.ondatachannel = null;
				peerConnection.onicecandidate=null;
				peerConnection.oniceconnectionstatechange = null;
				peerConnection.onicegatheringstatechange =null;
				peerConnection.onnegotiationneeded=null;
				peerConnection.onsignalingstatechange=null;
                peerConnection.ontrack=null;
				peerConnection.close();
				peerConnection=null;
            }
            
            socket.disconnect();    
		}
        function connectionStateChangeHandler(){

        }
        function dataChannelClose() {
			eventMsgLogger('Data channel closed');
		    dataChannel.onopen = null;
            dataChannel.onmessage = null;
            dataChannel.onclose = null;
            dataChannel.onerror = null;
            dataChannel=null;
		}
        function dataChannelError(event) {
			eventMsgLogger('Data channel error:'+event.message);
        }
        /*
		function dataChannelOpen() {
            eventMsgLogger('data channel is opened');
        }
        */
		function dataChannelMessage(message) {
			eventMsgLogger('Received Message from Data Channel:'+message.data);
		}
        function dataEventMsgLogger(event){
			eventMsgLogger('Data channel Object is created!');
			event.channel.onopen = dataChannelOpenHandler;
			event.channel.onmessage = dataChannelMessage;
			event.channel.onclose = dataChannelClose;
			event.channel.onerror = dataChannelError;
		}
        function iceCandidateEventHandler(event){
            if (event.candidate==null){
                eventMsgLogger("All ICE Candidates are sent");
			} else {
                eventMsgLogger("Send an ICE Candidate");
                socket.emit("sendICECandidate", event.candidate);				
			}
        }
        function iceConnectionStateChangeHandler(){

        }
        function iceGatheringStateChangeHandler(){

        }
        function negotiationEventHandler(){

        }
        function signalingStateChangeHandler(){

        }
/*===================================================================================================*/
/*       Socket related function                                                                     */
/*===================================================================================================*/
        socket.on('receiveAnswer',answer=>{
            eventMsgLogger("Receive an answer"); 
            peerConnection.setRemoteDescription(answer);
        });
        socket.on('receiveICECandidate',iceCandidate=>{
            eventMsgLogger("Receive an ICE Candidate");
            peerConnection.addIceCandidate(iceCandidate);
        });
        socket.on('receiveOffer',async offer=>{
            eventMsgLogger("Receive an offer");
            await peerConnection.setRemoteDescription(offer)
            .then(async()=>{
                await peerConnection.createAnswer()
                .then(async answer=>{
                    await peerConnection.setLocalDescription(answer)
                    .then(()=>{
                        socket.emit("sendAnswer",answer);
                        eventMsgLogger("Send an answer");
                    })
                    .catch (error=>{
                        throw error;
                    })
                })
                .catch(error=>{
                    throw error;
                })
            })
            .catch(error=>{
                throw error
            })
        });
    }

}
export default WebRTC;