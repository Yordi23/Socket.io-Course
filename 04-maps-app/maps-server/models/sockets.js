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

            socket.emit('active-markers', this.markers.activeMarkers);

            socket.on('new-marker', (marker) => {
                console.log("Event: new-marker", marker);
                this.markers.addMarker(marker);

                socket.broadcast.emit('new-marker', marker);
            });

            socket.on('update-marker', (marker) => {
                console.log("Event: update-marker", marker);
                this.markers.updateMarker(marker);

                socket.broadcast.emit('update-marker', marker);
            });


        });
    }


}


module.exports = Sockets;