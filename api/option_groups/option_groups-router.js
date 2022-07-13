const router = require('express').Router();
const OptionGroups = require('./option_groups-model');

router.post(
  '/query', 
  async (req, res, next) => {
    try {
      const optionGroups = await OptionGroups.findAll();
      res.status(200).json(optionGroups);
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