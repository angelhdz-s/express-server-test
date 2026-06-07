const { Router } = require('express');

function createOrderRoutes(orderController) {
  const router = Router();

  router.post('/', (req, res, next) => orderController.create(req, res, next));
  router.get('/:id', (req, res, next) => orderController.getById(req, res, next));

  return router;
}

module.exports = createOrderRoutes;
