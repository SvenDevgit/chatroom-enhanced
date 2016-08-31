$(document).ready(function() {

	var socket = io();
	var input = $('#text');
	var nickName = $('#nick');
	var messages = $('#messages');
	var disconnect = $('#disconnect');
	var connections = $('#connections');
	var nickOutput = $('#chatters');


	var addMessage = function(message) {
		messages.append('<div>' + message + '</div>');
	};

	var updateConnectionCount = function(connectionCount) {
		connections.text('Connections: ' + connectionCount);
	};

	var showChatters = function(chatters) {
		nickOutput.append('<div>' + chatters + '</div>')
	};

    var userDisonnected = function() {
		disconnect.append('<div>' + 'user disconnected' + '</div>')
	};

	input.on('keydown', function(event) {
		if(event.keyCode !=13) {
			return;
		}
		var message = nickName.val() + ' writes: ' + input.val();
		addMessage(message);
		socket.emit('message', message);
		input.val('');
	});

	nickName.on('keydown', function(event){
		if(event.keyCode !=13) {
			return;
		}
		var chatter = nickName.val();
		showChatters(chatter);
		socket.emit('chatter', chatter);
	});

	socket.on('message', addMessage);
	socket.on('userdisconnect', userDisonnected);
	socket.on('concount', updateConnectionCount);
	socket.on('chatter', showChatters);


});