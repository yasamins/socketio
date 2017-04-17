'use strict';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', function(socket) {
    const socketid = socket.id;
    socket.join('default');
    console.log('a user connected with session id '+socket.id);
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('message', function(jsonMsg) {
        //console.log(JSON.stringify(socket.rooms));
        console.log(socket.rooms);
        const currentroom = Object.keys(socket.rooms)[1];
        console.log('received message from client: '+jsonMsg+ ' on the room'+currentroom);
        io.to(currentroom).emit('message', jsonMsg);
    });
    socket.on('joinroom', function(jsonMsg) {
        console.log(socket.id+' join te room '+jsonMsg);
        const previousroom = Object.keys(socket.rooms)[1];
        socket.leave(previousroom);
        socket.join(jsonMsg);   
    });
   }
);
server.listen(8888, function() {
    console.log('Server started (8888)');
});