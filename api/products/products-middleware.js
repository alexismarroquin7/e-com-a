const Product = require('./products-model');

const validateProductExistsByProductId = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const product = await Product.findByProductId(Number(product_id));
    if(product){
      req.product = product;
      next();
    } else {
      next({
        status: 404,
        message: 'product does not exist'
      })
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateProductExistsByProductId
}