var socket_io = require('socket.io');
var io = socket_io();
// var ss = require('socket.io-stream');
var socketApi = {};
socketApi.io = io;

io.on('connection', (socket) => {
    // socket.on('hostVideo', (stream) => {
    //   console.log(stream);
    //   io.sockets.in(socket.room).emit('hostStream', stream);
    // })
    // ss(socket).on('hostVideo', function(stream) {
    //   ss(socket).emit('roomStream', stream); //.in(socket.room)
    // })
    // ss(socket).on('hostVideo', function (stream, data) {
    //     const _stream = ss.createStream();
    //     ss(socket).emit('hostVideo', _stream);
    //     stream.pipe(_stream);
    // });

    // socket.on('makeOffer', (data) => {
    //   socket.broadcast.emit('offerMade', {
    //     offer: data.offer,
    //     socket: socket.id
    //   })
    // })
    //
    // socket.on('makeAnswer', (data) => {
    //   socket.broadcast.emit('answerMade', {
    //     answer: data.answer,
    //     socket: socket.id
    //   })
    // })

    socket.on('create', (room) => {
      socket.room = room
      socket.join(room)
    })

    socket.on('addUser', (room, username) => {
      socket.username = username;
      socket.room = room
      socket.join(room)
    })

    socket.on('sendChat', (data, username) => {
      io.sockets.in(socket.room).emit('updatechat', username, data);
    })


    socket.on('disconnect', () => {
      socket.leave(socket.room)
  });
});

module.exports = socketApi;
