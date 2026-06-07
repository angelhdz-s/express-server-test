const { randomUUID } = require('node:crypto');

class Product {
  constructor({ id = randomUUID(), name, price, stock }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

module.exports = Product;
