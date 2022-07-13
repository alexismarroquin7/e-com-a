const router = require('express').Router();
const Inventory = require('./inventory-model');
const { validateQuery } = require('./inventory-middleware');
router.post(
  '/query', 
  validateQuery,
  async (req, res, next) => {
    try {
      const inventory = await Inventory.findAll(req.body);
      res.status(200).json(inventory);
    } catch (err) {
      next(err);
    }
  }
);

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});


module.exports = router;