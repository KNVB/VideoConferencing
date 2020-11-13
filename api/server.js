let bodyParser = require('body-parser')
let cors = require('cors')
let express = require('express');
let meetingManager=new (require("./utils/MeetingManager.js"));
let path = require('path')
let { ExpressPeerServer } = require('peer');

//===============================================================
let app = express();
let apiRouter= express.Router();
let httpServerPort = process.env["HTTP_PORT"];

//================================================================
/*****************************************************************/
/* if the server is connected to the internet via a web server   */
/* that have SSL cert,use the following 2 statements to start    */ 
/* the backend                                                   */    
/*****************************************************************/
let http =require('http');
let httpServer= http.createServer(app);

//================================================================
/*****************************************************************/
/* if the server is connected to the internet directly, you have */
/* to provide SSL certificate ,uncomment the following code,     */ 
/* and then comment the above 2 statements.                      */   
/*****************************************************************/
/*
let fs = require('fs');
let https = require('https');
let options = {
  key: fs.readFileSync('./private.key'),
  ca: [fs.readFileSync('./ca_bundle.crt')],
  cert: fs.readFileSync('./certificate.crt')
};
httpServer = https.createServer(options, app);
*/

//================================================================
let io = require('socket.io')(httpServer);
let peerServer=ExpressPeerServer(httpServer, {
  path: '/peerServer',
  proxied: true
});

//================================================================
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', peerServer); 
app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, 'build')))
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
apiRouter.post('/initMeeting',function(req,res){
	res.send(meetingManager.initMeeting(req.body));
});

apiRouter.use((err, req, res, next) => {
  if (err.notFound) {
    res.status(404)
  } else if (err.unauthorized) {
    res.status(401)
  } else if (err.badRequest) {
    res.status(400)
  } else {
    console.log(err.stack)
    res.status(500)
  }
  res.json({ error: true, message: err.message })
})

apiRouter.use((req, res, next) => {
  res.status(404).json({ error: true, message: 'not found' })
})

httpServer.listen(httpServerPort, function() {
  console.log('server up and running at %s port', httpServerPort);
});
io.on('connection', (socket) => {
	meetingManager.setSocket(io,socket);	
})
peerServer.on('connection', (client) => {
	console.log("Peer server connection:");
	console.log(client.id);
});
peerServer.on('disconnect', (client) => {
	console.log("Peer server disconnected:");
	console.log(client.id);
});
//================================================================