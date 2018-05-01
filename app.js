let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection' (socket) =>{
  socket.on('disconnect',function(){
    console.log('disconnect');
  });
  socket.on('message',(message)=>{
    socket.broadcast.emit('message',message);
  });
});

http.listen(5000,() =>{
  console.log('started on port 5000');
});
