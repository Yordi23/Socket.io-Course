const MarkerList = require("./markerList");


class Sockets {

    constructor(io) {

        this.io = io;
        this.markers = new MarkerList();
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('Client connected');

            // socket.on('mensaje-to-server', (data) => {
            //     console.log(data);

            //     this.io.emit('mensaje-from-server', data);
            // });


        });
    }


}


module.exports = Sockets;