const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 5000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log("Player Connected!");
  socket.emit("socketID", { id: socket.id } );
  socket.broadcast.emit("newPlayer", { id: socket.id } );
  socket.on('disconnect', () => console.log('Player disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
