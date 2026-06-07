const ProductRepository = require('../../domain/repositories/product.repository');

class InMemoryProductRepository extends ProductRepository {
  constructor() {
    super();
    this.products = new Map();
  }

  async save(product) {
    this.products.set(product.id, product);
    return product;
  }

  async findById(id) {
    return this.products.get(id) || null;
  }

  async findAll() {
    return Array.from(this.products.values());
  }
}

module.exports = InMemoryProductRepository;
