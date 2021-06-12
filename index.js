var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var path = require('path');

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

// Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected');

  // Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});

app.all('*', function(req, res) {
  res.status(404).send('You found the catch all 404!');
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})