const { HTTP_STATUS } = require('../../constants');

class ProductController {
  constructor(createProductUseCase, getAllProductsUseCase) {
    this.createProductUseCase = createProductUseCase;
    this.getAllProductsUseCase = getAllProductsUseCase;
  }

  async create(req, res, next) {
    try {
      const { name, price, stock } = req.body;
      const product = await this.createProductUseCase.execute({ name, price, stock });
      res.status(HTTP_STATUS.CREATED).json(product);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await this.getAllProductsUseCase.execute();
      res.status(HTTP_STATUS.OK).json(products);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
