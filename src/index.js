const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const serverConfig = require('./server.config.json');
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const connectedUsers = [];

app.use(cors());

app.get('/', (req, res) => {
  res.send(`<html><head><script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io();
  </script></head></html>`);
});

io.on('connection', (socket) => {
  connectedUsers.push(socket);

  socket.on('chat message', (msg) => {
    console.log(msg);
  });

  socket.on('poke', () => {
    connectedUsers.forEach((user) => {
      if (user.id !== socket.id) {
        user.emit('poke', `You got poked by user: ${socket.id}`);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);

    const foundIndex = connectedUsers.findIndex((user) => user.id === socket.id);
    // remove disconnected client from our array
    connectedUsers.splice(foundIndex, 1);
  });
});

server.listen(serverConfig.port, () => {
  console.log(`listening on http://localhost:${serverConfig.port}`);
});
