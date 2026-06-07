const Product = require('../../domain/entities/product.entity');

class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute({ name, price, stock }) {
    const product = new Product({ name, price, stock });
    return this.productRepository.save(product);
  }
}

module.exports = CreateProductUseCase;
