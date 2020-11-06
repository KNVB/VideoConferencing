const { PeerServer } = require('peer');

const peerServer = PeerServer({
  debug: true,
  port: 9000,
  path: '/peerServer',
  proxied: true
});
peerServer.on('connection', (client) => {
	console.log("Peer server connection:");
	console.log(client.id);
});
peerServer.on('disconnect', (client) => {
	console.log("Peer server disconnected:");
	console.log(client.id);
});