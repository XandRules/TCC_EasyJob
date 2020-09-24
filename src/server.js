import app from './app';

var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

io.on("connection", function (client) {
  client.on("join", function (name) {
    console.log("Joined: " + name);
    clients[client.id] = name;
    client.emit("update", "You have connected to the server.");
    client.broadcast.emit("update", name + " has joined the server.")
  });

  client.on("send", function (msg) {
    console.log("Message: " + msg);
    client.broadcast.emit("chat", clients[client.id], msg);
  });

  client.on("disconnect", function () {
    console.log("Disconnect");
    io.emit("update", clients[client.id] + " has left the server.");
    delete clients[client.id];
  });
});

app.listen(process.env.PORT || 3333);
