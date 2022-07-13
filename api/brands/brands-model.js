const db = require('../data/db-config');

/**
 * Finds all brands in the database
 * @param {Object} query
 * @param {String} query.sorts.by
 * @param {String} query.sorts.order
 * @param {Object} query.filters
 * @param {Array} query.filters.and
 * @param {Array} query.filters.or
 * @return {Array} list of brands
 */

const findAll = async (query = {}) => {

  let brands = await db('brands as b')
  .select(
    "b.brand_id",
    "b.brand_name as name",
    "b.brand_description as description",
    "b.brand_created_at as created_at",
    "b.brand_updated_at as updated_at",
  )
  .orderBy(query.sorts.by || 'brand_id', query.sorts.order || 'asc');

  if(!(Object.keys(query.filters).length === 0)){
    const keys = Object.keys(query.filters);
    if(keys.length !== 2){
      throw Error(`filter must only have two keys`);
    }
    
    let filterType = '';
    
    keys.forEach(key => {
      if(key !== 'property'){
        filterType = key;
      }
    });
    
    if(filterType === 'equals'){
      brands = brands.filter(brand => brand[query.filters.property] === query.filters[filterType]);
    } else if(filterType === 'does_not_equal'){
      brands = brands.filter(brand => brand[query.filters.property] !== query.filters[filterType]);
    } else {
      throw Error(`unknown filter type: ${filterType}`);
    }
  
  }

  return brands;
}

const findById = async (brand_id) => {
  const brands = await findAll({
    filters: {
      property: 'brand_id',
      equals: brand_id
    }
  });
  
  
  return brands.length === 1
  ? brands[0]
  : null;
}

module.exports = {
  findAll,
  findById
}