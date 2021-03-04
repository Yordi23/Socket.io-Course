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
    this.socket = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    this.app.use(cors());

    this.app.get('/tickets/top', (req, res) => {
      res.json({
        status: 'success',
        topTickets: this.socket.ticketList.topTickets
      })
    })
  }

  start() {
    //Initialize middleware
    this.middlewares();

    //Initialize server
    this.server.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

module.exports = Server;
