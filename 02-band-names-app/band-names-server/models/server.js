const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = 8080;

    //Http server
    this.server = http.createServer(this.app);

    // Socket configuration
    this.io = socketio(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    this.app.use(cors());
  }

  socketConfiguration() {
    new Sockets(this.io);
  }

  start() {
    //Initialize middleware
    this.middlewares();

    //Initializa socket
    this.socketConfiguration();

    //Initialize server
    this.server.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

module.exports = Server;
