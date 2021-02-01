const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));

const server = app.listen(3010, () => {
    console.log('Server is running on 3010');
});

const io = socketio(server);

const messageHistory = [];

io.on('connection', (socket) => {

    io.sockets.emit('newUser', messageHistory)

    socket.on('chat', (data) => {
        messageHistory.push({
            id: socket.id,
            message: data
        })
        io.sockets.emit('message', {
            id: socket.id,
            message: data
        })
    })
})