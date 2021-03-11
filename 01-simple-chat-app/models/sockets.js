class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client conected");
      socket.on("message-to-server", (data) => {
        console.log(data);

        this.io.emit("message-to-client", data);
      });
    });
  }
}

module.exports = Sockets;
