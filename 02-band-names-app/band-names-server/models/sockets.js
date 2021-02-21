const BandList = require('./band-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('Client conected');

      socket.emit('current-bands', this.bandList.getAllBands());
    });
  }
}

module.exports = Sockets;
