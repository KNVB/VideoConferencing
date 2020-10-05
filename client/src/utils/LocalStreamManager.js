class LocalStreamManager{
    constructor(){
       
        this.getMediaStream=async (shareVideo,shareAudio)=>{
            if ((shareVideo===false) && (shareAudio===false)){
                return null;
            } else {
                var constraints={"audio":shareAudio,"video":shareVideo};
                console.log(constraints);   
                return navigator.mediaDevices.getUserMedia(constraints);
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
    }
   
}

export default LocalStreamManager;