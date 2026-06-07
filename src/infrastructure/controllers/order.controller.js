const { HTTP_STATUS } = require('../../constants');

class OrderController {
  constructor(createOrderUseCase, getOrderUseCase) {
    this.createOrderUseCase = createOrderUseCase;
    this.getOrderUseCase = getOrderUseCase;
  }

  async create(req, res, next) {
    try {
      const { items } = req.body;
      const order = await this.createOrderUseCase.execute({ items });
      res.status(HTTP_STATUS.CREATED).json(order);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await this.getOrderUseCase.execute({ id });
      res.status(HTTP_STATUS.OK).json(order);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;
