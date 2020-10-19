import app from './app';

var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {}; 

var room = '';

app.post('/newchat', function(req, res){

    console.log(req.body)

    var ret;

  io.on("connection", client =>{

      client.join(req.body.room);

      room = req.body.room;

    client.on(req.body.room, name =>{
          clients[client.id] = name;
          client.emit("update", "You have connected to the server.");
          client.broadcast.emit("update", name + " has joined the server.");
    });
      
    client.on("send", function(msg){
    	console.log("Message: " + msg);
        client.emit(room, clients[client.id], msg);
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " has left the server.");
        delete clients[client.id];
    });
  })

  console.log(ret);
    
  return res.json({room : req.body.room});
});

io.on("connection", function (client) {  

    client.on("join", function(name){
    	console.log("Joined: " + name);
        clients[client.id] = name;
        client.emit("update", "You have connected to the server.");
        client.broadcast.emit("update", name + " has joined the server.")
    });

    client.on("send", function(msg){
    	console.log("Message: " + msg);
        client.emit(room, clients[client.id], msg);
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " has left the server.");
        delete clients[client.id];
    });
});

var server  = app.listen(process.env.PORT || 3333);

io.listen(server);
