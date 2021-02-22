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

      socket.on('vote-band', (data) => {
        this.bandList.voteUp(data.id);
        this.io.emit('current-bands', this.bandList.getAllBands());
      });

      socket.on('delete-band', (data) => {
        this.bandList.deleteBand(data.id);
        this.io.emit('current-bands', this.bandList.getAllBands());
      });

      socket.on('update-band-name', (data) => {
        this.bandList.updateBandName(data.id, data.name);
        this.io.emit('current-bands', this.bandList.getAllBands());
      });

      socket.on('create-band', (data) => {
        this.bandList.createBand(data.name);
        this.io.emit('current-bands', this.bandList.getAllBands());
      });
    });
  }
}

module.exports = Sockets;
