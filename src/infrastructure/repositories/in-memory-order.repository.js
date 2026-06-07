const OrderRepository = require('../../domain/repositories/order.repository');

class InMemoryOrderRepository extends OrderRepository {
  constructor() {
    super();
    this.orders = new Map();
  }

  async save(order) {
    this.orders.set(order.id, order);
    return order;
  }

  async findById(id) {
    return this.orders.get(id) || null;
  }

  async findAll() {
    return Array.from(this.orders.values());
  }
}

module.exports = InMemoryOrderRepository;
