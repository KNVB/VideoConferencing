let httpServerPort = 9000;
//===============================================================
let apiRouter,app,bodyParser,cors,express;
let http,httpServer,io,meetingManager,path,peerServer;
bodyParser = require('body-parser')
cors = require('cors')
express = require('express');
path = require('path')

let { ExpressPeerServer } = require('peer');
//===============================================================
app = express();
apiRouter= express.Router();
//================================================================
http =require('http');
httpServer= http.createServer(app);
//================================================================
/*****************************************************************/
/* if the server is connected to internet directly, you have to  */
/* provide SSL certificate.                                      */   
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
io = require('socket.io')(httpServer);
meetingManager=new (require("./utils/MeetingManager.js"));
peerServer=ExpressPeerServer(httpServer, {
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