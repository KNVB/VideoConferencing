module.exports={
	getTimeString
}	
function getTimeString(){
	var date=new Date();
	var result=date.getHours()+":"+date.getMinutes() +":"+date.getSeconds()+"."+date.getMilliseconds();
	return result;
}