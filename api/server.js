var apiRouter,app,bodyParser,cors,express;
var http,httpServer,httpServerPort,io;

var loginRouter,meetingList,userList;
bodyParser = require('body-parser')
cors = require('cors')
express = require('express');
httpServerPort = 9000;
loginRouter = require('./routes/login')

app = express();
http = require('http');
httpServer= http.createServer(app);
io = require('socket.io')(httpServer);
httpServer.listen(httpServerPort, function() {
  console.log('server up and running at %s port', httpServerPort);
});

meetingList={};
userList={};

apiRouter= express.Router();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

app.use('/api', apiRouter);
apiRouter.use('/login', function(req,res,next){
		req.body.meetingList=meetingList;
		req.body.userList=userList;
		next();
	},loginRouter)
	
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