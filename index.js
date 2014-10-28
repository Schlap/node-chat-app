var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(request, response){
  response.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('user connected notification', 'user connected');
  socket.on('chat message', function(msg){ 
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function () {
    console.log('disconnected');
    io.sockets.emit('user disconnected notification', 'user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});