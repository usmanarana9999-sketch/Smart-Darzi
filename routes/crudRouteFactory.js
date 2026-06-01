const express = require('express');
const auth = require('../middleware/authMiddleware');
const createCrudController = require('../controllers/crudControllerFactory');

const createCrudRouter = (Model, resourceName, options) => {
  const router = express.Router();
  const controller = createCrudController(Model, resourceName, options);

  router.use(auth);
  router.post('/', controller.create);
  router.get('/', controller.list);
  router.get('/:id', controller.get);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);

  return router;
};

module.exports = createCrudRouter;
