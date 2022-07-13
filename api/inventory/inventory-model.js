const db = require('../data/db-config');
const Variation = require('../variations/variations-model');
const Product = require('../products/products-model');

const getProp = (obj = {}, keyString = '') => {

  let keys = keyString.split('.');

  let res = {...obj};
  
  keys.forEach((key) => {
  
    if(/[a-zA-Z]+\[\d+\]/.test(key)) { // if matches list - example: names[10]
      
      const indexToSliceAt = key.search(/\[/); // search for keyname end
      
      const keyToUse = key.slice(0, indexToSliceAt);
      const indexToUse = Number(key.slice(indexToSliceAt + 1, key.length - 1));
      
      res = res[keyToUse][indexToUse];
      
    } else {
      res = res[key];
    }
  })
  
  return res;
}

const findAll = async (query = {}) => {
  
  const rows = await db('inventory as i')

  return Promise.all(rows.map(async row => {
    const variations = await Variation.findBySku(row.sku);
    const product = await Product.findByProductId(row.product_id);
    
    const inv_item = {
      sku: row.sku,
      price: Number(row.price),
      amount_in_stock: row.amount_in_stock,
      created_at: row.inventory_created_at,
      updated_at: row.inventory_updated_at,
      product,
      variations: variations ? variations : []
    }

    return inv_item;
    
  }))
  .then(inventory => {
    if(Object.keys(query).length === 0){
      return inventory;
    }
  
    if(query.sorts.by && query.sorts.order) {
      if(
        query.sorts.by !== 'sku' &&
        query.sorts.by !== 'product.product_id'
      ){
        throw Error(`unknown sorts.by: ${query.sorts.by}`)  
      }
      
      if(
        query.sorts.order !== 'asc' &&
        query.sorts.order !== 'desc'
      ){
        throw Error(`unknown sorts.order: ${query.sorts.order}`)
      }
  
      if(
        query.sorts.by === 'sku' ||
        query.sorts.by === 'product.product_id'
      ) {
        inventory = inventory.sort((a,b) => {
          const propA = getProp(a, query.sorts.by);
          const propB = getProp(b, query.sorts.by);
          return query.sorts.order === 'asc'
          ? propA - propB
          : propB - propA;
        });
      } else {
        inventory = inventory.sort((a,b) => {
          const propA = getProp(a, query.sorts.by);
          const propB = getProp(b, query.sorts.by);
          return query.sorts.order === 'asc' 
          ? propA.localeCompare(propB)
          : propB.localeCompare(propA);
        });
      }
    
    }
    return inventory;
  });

}

module.exports = {
  findAll
}