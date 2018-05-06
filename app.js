var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
server.listen(server_port, server_ip_address, () => {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  
  socket.on('disconnect',function(){
    console.log('disconnect');
  });
  socket.on('message',(message)=>{
    socket.broadcast.emit('message',message);
  });
});

