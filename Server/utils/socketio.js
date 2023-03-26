var io = require('socket.io')();
var socketAPI = {};

socketAPI.io = io;

io.on('connection', (socket) => {
    // console.log(socket.id) // logs connected users

    socket.on('join-room', (roomName) => {
        socket.join(roomName)
    })

    socket.on('new-service-spec', (data) => {
        socket.to("providers").emit('receive-new-service-spec', data);
    })

    socket.on('accept-service-spec', (data) => {
        socket.to(data).emit('receive-accept-service-spec', 'Service Specs Accepted');
    })

    socket.on('finalize-service-spec', (data) => {
        socket.to(data).emit('receive-finalize-service-spec', 'Final Specs Sent');
    })

    socket.on('accept-finalize-service-spec', (data) => {
        socket.to(data).emit('receive-accept-finalize-service-spec', 'Final Specs Accepted');
    })

    socket.on('provider-serving', (data) => {
        socket.to(data).emit('receive-provider-serving', 'Provider is Serving');
    })
    socket.on('payment-received', (data) => {
        socket.to(data).emit('receive-payment-received', 'Provider received Payment');
    })
    socket.on('provider-done', (data) => {
        socket.to(data).emit('receive-provider-done', 'Provider has Finished');
    })
});


module.exports = socketAPI;