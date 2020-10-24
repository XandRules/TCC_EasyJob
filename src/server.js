import app from './app';

var http = require('http').Server(app);
var io = require('socket.io')(http);

import ChatController from './app/controllers/ChatController';

var clients = {}; 

app.post('/newchat', function(req, res){

    io.on("connection", client =>{
        const name = req.body.room;

        client.join(name, function(error){
            return res.json({error});
        })
    })
  res.send('server is running');
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
        client.broadcast.emit("chat", clients[client.id], msg);
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " has left the server.");
        delete clients[client.id];
    });
});

var server  = app.listen(process.env.PORT || 3333);

io.listen(server);

