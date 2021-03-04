const TicketList = require('./ticket-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('Client conected');

      // socket.emit('current-bands', this.bandList.getAllBands());

      socket.on('create-ticket', (data, cb) => {
        const newTicket = this.ticketList.createTicket();
        console.log('Ticket created:', newTicket);
        cb(newTicket);
      });

      socket.on('get-next-ticket', ({ name, desktop }, cb) => {
        const nextTicket = this.ticketList.assignTicket(name, desktop);

        console.log('Assigned ticket:', nextTicket);
        cb(nextTicket);
      });
    });
  }
}

module.exports = Sockets;
