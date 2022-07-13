
const validateQuery = (req, res, next) => {
  /**
    * @param {Object} query
    * @param {Object} query.sorts
    * @param {Object} query.filters
    * @param {Object} query.filters.and
    * @param {Object} query.filters.or
   */
  const {
    sorts,
    filters
  } = req.body;

  const set = {
    sortsOrder: new Set([
      'asc',
      'desc'
    ]),
    sortsBy: new Set([
      'sku',
      'product.product_id',
      // 'product.name',
      // 'product.category.category_id',
      // 'product.category.name',
      // 'product.category.title',
      // 'product.brand.brand_id',
      // 'product.brand.name'
    ]),
  }

  const validSortsBy = (value) => {
    return set.sortsBy.has(value);
  };
  
  const validSortsOrder = (value) => {
    return set.sortsOrder.has(value);
  };

  const validSorts = (sorts) => {
    return validSortsBy(sorts.by) === true && validSortsOrder(sorts.order) === true ? true : false;
  }


  if(sorts && sorts.by && sorts.order && filters && filters.and && filters.or){
    if(!validSortsBy(sorts.by)){
      next({
        status: 400,
        message: `invalid sorts.by must be one of the following ${Array.from(set.sortsBy)} - value: ${JSON.stringify(sorts.by)}`
      })
    } else if(!validSortsOrder(sorts.order)){
      next({
        status: 400,
        message: `invalid sorts.order must be one of the following ${Array.from(set.sortsOrder)} - value: ${JSON.stringify(sorts.order)}`
      })
    } else {
      next();
    }
  } else if(sorts && sorts.by && sorts.order && filters && filters.and) {
    next();
  } else if(sorts && sorts.by && sorts.order && filters && filters.or) {
    next();
  } else if(sorts && sorts.by && sorts.order) {
    if(!validSortsBy(sorts.by)){
      next({
        status: 400,
        message: `invalid sorts.by must be one of the following ${Array.from(set.sortsBy)} - value: ${JSON.stringify(sorts.by)}`
      })
    } else if(!validSortsOrder(sorts.order)){
      next({
        status: 400,
        message: `invalid sorts.order must be one of the following ${Array.from(set.sortsOrder)} - value: ${JSON.stringify(sorts.order)}`
      })
    } else {
      next();
    }
  } else if(sorts && sorts.order) {
    next();
  } else if(sorts && sorts.by) {
    next();

  } else {
    next();
  }

}



module.exports = {
  validateQuery
}