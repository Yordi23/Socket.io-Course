const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {

    constructor() {

        this.app = express();
        this.port = 8080;

        // Http server
        this.server = http.createServer(this.app);

        // Socket configuration
        this.io = socketio(this.server, { /* configuraciones */ });
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        this.middlewares();

        this.configurarSockets();

        this.server.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }

}

module.exports = Server;