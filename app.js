var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('../..')(server);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
server.listen(server_port, server_ip_address, () => {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

io.on('connection', (socket) => {
  
  socket.on('disconnect',function(){
    console.log('disconnect');
  });
  socket.on('message',(message)=>{
    socket.broadcast.emit('message',message);
  });
});

