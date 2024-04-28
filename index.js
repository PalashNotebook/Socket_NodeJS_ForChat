
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let users = 0;

app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var filename = 'index.html';
    res.sendFile(filename, options);
});

var cnsp = io.of('/namespace_1')

cnsp.on('connection', (socket) => {
    users++;
    console.log('A user connected');

    socket.emit('welcome', 'Hey Welcome to chat');
    socket.broadcast.emit('broadcast', {description: users + ' connected'});

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    socket.on('dEvent', (data)=>{
        console.log(data);
    })
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
