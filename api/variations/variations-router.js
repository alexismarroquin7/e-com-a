const router = require('express').Router();
const Variations = require('./variations-model');

router.post(
  '/query', 
  async (req, res, next) => {
    try {
      const variations = await Variations.findAll();
      res.status(200).json(variations);
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