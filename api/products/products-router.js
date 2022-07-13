const router = require('express').Router();
const Product = require('./products-model');
const { validateProductExistsByProductId } = require('./products-middleware');

router.post(
  '/query', 
  async (req, res, next) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:product_id',
  validateProductExistsByProductId,
  (req, res) => {
    res.status(200).json(req.product);
  }
);

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});


module.exports = router;