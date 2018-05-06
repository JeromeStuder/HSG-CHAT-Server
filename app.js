let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 


io.on('connection' (socket)=>{
  
  socket.on('disconnect',function(){
    console.log('disconnect');
  });
  socket.on('message',(message)=>{
    socket.broadcast.emit('message',message);
  });
});

http.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});