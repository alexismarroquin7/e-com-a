const router = require('express').Router();
const Option = require('./options-model');

router.post(
  '/query', 
  async (req, res, next) => {
    try {
      const options = await Option.findAll();
      res.status(200).json(options);
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