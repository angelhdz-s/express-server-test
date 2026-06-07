const { Router } = require('express');

function createProductRoutes(productController) {
  const router = Router();

  router.get('/', (req, res, next) => productController.getAll(req, res, next));
  router.post('/', (req, res, next) => productController.create(req, res, next));

  return router;
}

module.exports = createProductRoutes;
