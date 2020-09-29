class LocalStreamManager{
    constructor(){
       
        this.getMediaStream=(shareVideo,shareAudio)=>{
			var constraints={"audio":shareAudio,"video":shareVideo};
            return navigator.mediaDevices.getUserMedia(constraints);
        }
        this.getShareDesktopStream=async(shareVideo,shareAudio)=>{
			var constraints={"audio":shareAudio,"video":shareVideo};
			return navigator.mediaDevices.getDisplayMedia(constraints);
        }
    }
   
}

export default LocalStreamManager;