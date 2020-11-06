class Utility{
	static getCurrentTimeString(){
		var m=new Date();
		var result=("0" + m.getHours()).slice(-2) + ":" +
		("0" + m.getMinutes()).slice(-2) + ":" +
		("0" + m.getSeconds()).slice(-2);
		return result;
	}
	static getCurrentDateTimeString(){
		var m=new Date();
		var result=m.getFullYear() + "/" +
		("0" + (m.getMonth()+1)).slice(-2) + "/" +
		("0" + m.getDate()).slice(-2) + " " +
		("0" + m.getHours()).slice(-2) + ":" +
		("0" + m.getMinutes()).slice(-2) + ":" +
		("0" + m.getSeconds()).slice(-2);
		return result;
	}
	static getRandomInt(max){
		return Math.floor(Math.random() * Math.floor(max));
	}
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