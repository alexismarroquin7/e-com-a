const router = require('express').Router();

const productsRouter = require('./products/products-router');
const inventoryRouter = require('./inventory/inventory-router');
const variationsRouter = require('./variations/variations-router');
const optionsRouter = require('./options/options-router');
const optionGroupsRouter = require('./option_groups/option_groups-router');
const brandsRouter = require('./brands/brands-router');

router.use('/products', productsRouter);
router.use('/inventory', inventoryRouter);
router.use('/variations', variationsRouter);
router.use('/options', optionsRouter);
router.use('/option_groups', optionGroupsRouter);
router.use('/brands', brandsRouter);

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});


module.exports = router;