const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const serverConfig = require('./server.config.json');
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.send(`<html><head><script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io();
  </script></head></html>`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(serverConfig.port, () => {
  console.log(`listening on http://localhost:${serverConfig.port}`);
});
