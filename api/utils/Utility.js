module.exports={
	getTimeString
}	
function getTimeString(){
	var m=new Date();
	var result=m.getFullYear() + "/" +
	("0" + (m.getMonth()+1)).slice(-2) + "/" +
	("0" + m.getDate()).slice(-2) + " " +
	("0" + m.getHours()).slice(-2) + ":" +
	("0" + m.getMinutes()).slice(-2) + ":" +
	("0" + m.getSeconds()).slice(-2) + ":" +
	("0" + m.getMilliseconds()).slice(-2);
	return result;
}