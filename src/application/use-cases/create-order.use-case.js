const Order = require('../../domain/entities/order.entity');

class CreateOrderUseCase {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async execute({ items }) {
    let total = 0;

    for (const item of items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        const error = new Error(`Product ${item.productId} not found`);
        error.statusCode = 404;
        throw error;
      }
      total += product.price * item.quantity;
    }

    const order = new Order({ items, total });
    return this.orderRepository.save(order);
  }
}

module.exports = CreateOrderUseCase;
