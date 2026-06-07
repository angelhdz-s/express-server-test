const express = require('express');
const { PORT } = require('../constants');
const Product = require('../domain/entities/product.entity');
const InMemoryProductRepository = require('./repositories/in-memory-product.repository');
const InMemoryOrderRepository = require('./repositories/in-memory-order.repository');
const CreateProductUseCase = require('../application/use-cases/create-product.use-case');
const GetAllProductsUseCase = require('../application/use-cases/get-all-products.use-case');
const CreateOrderUseCase = require('../application/use-cases/create-order.use-case');
const GetOrderUseCase = require('../application/use-cases/get-order.use-case');
const ProductController = require('./controllers/product.controller');
const OrderController = require('./controllers/order.controller');
const createProductRoutes = require('./routes/product.routes');
const createOrderRoutes = require('./routes/order.routes');

function buildApp() {
  const productRepository = new InMemoryProductRepository();
  const orderRepository = new InMemoryOrderRepository();

  const createProductUseCase = new CreateProductUseCase(productRepository);
  const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
  const createOrderUseCase = new CreateOrderUseCase(orderRepository, productRepository);
  const getOrderUseCase = new GetOrderUseCase(orderRepository);

  const productController = new ProductController(createProductUseCase, getAllProductsUseCase);
  const orderController = new OrderController(createOrderUseCase, getOrderUseCase);

  const app = express();

  app.use(express.json());

  app.use('/api/products', createProductRoutes(productController));
  app.use('/api/orders', createOrderRoutes(orderController));

  app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message });
  });

  seedMockProducts(productRepository);

  return app;
}

function seedMockProducts(repository) {
  const mockProducts = [
    new Product({ name: 'Tacos al pastor', price: 35, stock: 50 }),
    new Product({ name: 'Quesadilla de pollo', price: 45, stock: 30 }),
    new Product({ name: 'Bebida de horchata', price: 20, stock: 100 }),
  ];
  mockProducts.forEach((product) => repository.save(product));
}

function start() {
  const app = buildApp();
  app.listen(PORT, () => {
    console.log(`POS server running on http://localhost:${PORT}`);
  });
}

module.exports = { buildApp, start };
