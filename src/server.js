import app from './app';

var http = require('https').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send("Servidor iniciado com sucesso");
})

var clients = {};
io.origins(['https://easyjobapp.vercel.app']);

io.on("connection", (client) => {
  client.on("join", (name) => {

    console.log("joined" + name);
    clients[client.id] = name;
    client.emit("update", "You have connected to the server");
    client.broadcast.emit("update", name + "has joined the server");
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

app.listen(3333);
