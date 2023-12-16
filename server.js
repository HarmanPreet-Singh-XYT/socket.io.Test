const { instrument } = require('@socket.io/admin-ui')
const io = require('socket.io')(4000,{
    cors:{
        origin:['http://localhost:3000','https://admin.socket.io'],
        credentials: true
    },
})
io.of("/users").on("connection", (socket) => {
    console.log('user connected on userdata')
});
io.on('connection',socket=>{
    console.log(socket.id)
    socket.on('message',(msg,room,)=>{
        io.to(room).emit('receive',msg);
    })
    socket.on('join-room',(room,cb)=>{
        socket.join(room);
        cb(room);
    })
})
instrument(io,{auth:false,mode:'development'})