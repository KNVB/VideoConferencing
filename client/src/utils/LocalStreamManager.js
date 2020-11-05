class LocalStreamManager{
    constructor(){
		var templateConstraint={
					"audio":{
								channelCount: 2,
								echoCancellation:true,
								sampleSize: 16
							},
					"video":{
								width:{ min:"640", ideal:"1280", max:"1920"},
								height:{ min:"480", ideal:"720", max:"1080"}
							}
					}; 
        this.getMediaStream=async (shareVideo,shareAudio)=>{
			//var constraints={"audio":shareAudio,"video":shareVideo};
			var constraints={};
			console.log("shareVideo="+shareVideo+",shareAudio="+shareAudio);
			if (shareVideo){
				constraints["video"]=templateConstraint.video;
			}
			//console.log("constraints="+JSON.stringify(constraints)); 
			if (shareAudio){
				constraints["audio"]=templateConstraint.audio;
			}
			console.log("constraints="+JSON.stringify(constraints)); 
			if (shareVideo||shareAudio) { 
				return await navigator.mediaDevices.getUserMedia(constraints);
			} else {
				return null;
			}
        }
        this.getShareDesktopStream=async(shareVideo,shareAudio)=>{
            if ((shareVideo===false) && (shareAudio===false)){
               return null;     
            } else {
			    var constraints={"audio":shareAudio,"video":shareVideo};
                return navigator.mediaDevices.getDisplayMedia(constraints);
            }
		}
		this.closeStream=async(stream)=>{
			console.log("LocalStreamManager.closeStream is called.");
			if (stream){
				stream.getTracks().forEach( async track=>{
					await track.stop();
				});
				stream=null;
			}
		}
    }
   
}

export default LocalStreamManager;