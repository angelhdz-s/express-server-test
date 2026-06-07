const { randomUUID } = require('node:crypto');
const { ORDER_STATUS } = require('../../constants');

class Order {
  constructor({ id = randomUUID(), items = [], total = 0, status = ORDER_STATUS.PENDING, createdAt = new Date() }) {
    this.id = id;
    this.items = items;
    this.total = total;
    this.status = status;
    this.createdAt = createdAt;
  }
}

module.exports = Order;
