const router = require('express').Router();
const Brand = require('./brands-model');
const { validateQuery } = require('./brands-middleware');
router.post(
  '/query', 
  validateQuery,
  async (req, res, next) => {
    try {
      const brands = await Brand.findAll(req.body);
      res.status(200).json(brands);
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