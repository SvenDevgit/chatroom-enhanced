var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var connectionCount = 0;

io.on('connection', function(socket) {
	console.log('Client connected');
    connectionCount++;
    io.emit('concount', connectionCount);


	socket.on('message', function(message) {
		console.log('Received message', message);
        socket.broadcast.emit('message', message);
	});

    socket.on('chatter', function(chatter) {
        console.log('Received chatter', chatter);
        socket.broadcast.emit('chatter', chatter);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
        connectionCount--;
        io.emit('concount', connectionCount);
        io.emit('userdisconnect');
    });
});

server.listen(8080);
