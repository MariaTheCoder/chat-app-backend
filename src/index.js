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

app.use(cors());

app.get('/', (req, res) => {
  res.send(`<html><head><script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io();
  </script></head></html>`);
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg);
  });

  socket.on('poke', () => {
    io.emit('poke', 'You got poked!');
  });
});

server.listen(serverConfig.port, () => {
  console.log(`listening on http://localhost:${serverConfig.port}`);
});
