class GetOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ id }) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      const error = new Error(`Order ${id} not found`);
      error.statusCode = 404;
      throw error;
    }
    return order;
  }
}

module.exports = GetOrderUseCase;
