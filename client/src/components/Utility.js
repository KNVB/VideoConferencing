class Utility{
    static toHHMMSS(timeInSec){
		var result="";
		var sec_num=Number(timeInSec).toFixed(0);
        var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

			result=hours+":";
			if (hours < 10){
				result="0"+result;
			}
			
			if (minutes < 10) {minutes = "0"+minutes;}
			if (seconds < 10) {seconds = "0"+seconds;}
			
			result+=minutes+':'+seconds;
			return result;
    }
}
export default Utility;