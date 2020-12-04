const app= require('express');
const serverHtpp = require ('http').Server(app);
const io= require('socket.io')(serverHtpp);

const Messages=[];

io.on('connection',function(socket){
    socket.on('send-message',function(data){
        Messages.push(data)
        socket.emit('text-event',Messages)
        socket.broadcast.emit('text-event',Messages)
    })
})

module.exports=io;