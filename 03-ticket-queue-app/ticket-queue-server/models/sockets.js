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

			// socket.on('delete-band', (data) => {
			//   this.bandList.deleteBand(data.id);
			//   this.io.emit('current-bands', this.bandList.getAllBands());
			// });

			// socket.on('update-band-name', (data) => {
			//   this.bandList.updateBandName(data.id, data.name);
			//   this.io.emit('current-bands', this.bandList.getAllBands());
			// });

			// socket.on('create-band', (data) => {
			//   this.bandList.createBand(data.name);
			//   this.io.emit('current-bands', this.bandList.getAllBands());
			// });
		});
	}
}

module.exports = Sockets;
