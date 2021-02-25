const Ticket = require('./ticket');

class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pendingTickets = [];
    this.assignedTickets = [];
  }

  get nextNumber() {
    return ++this.lastNumber;
  }

  get topTickets() {
    return this.assignedTickets.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Ticket(nextNumber());
    this.pendingTickets.push(newTicket);

    return newTicket;
  }

  assignTicket(agent, desktop) {
    if (this.pendingTickets.length) return undefined;
    if (!agent || !desktop) return undefined;

    const nextTicket = this.pendingTickets.shift();
    nextTicket.agent = agent;
    nextTicket.desktop = desktop;

    this.assignedTickets.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;
