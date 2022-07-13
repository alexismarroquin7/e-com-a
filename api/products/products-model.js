const db = require('../data/db-config');
const OptionGroup = require('../option_groups/option_groups-model');
const Option = require('../options/options-model');

const findAll = async () => {
  const rows = await db('products as p')
  .join('brands as b', 'b.brand_id', 'p.brand_id')
  .join('categories as c', 'c.category_id', 'p.category_id')
  
  let products = rows.map(row => {
    return {
      product_id: row.product_id,
      name: row.product_name,
      description: row.product_description,
      created_at: row.product_created_at,
      updated_at: row.product_updated_at,
      brand: {
        brand_id: row.brand_id,
        name: row.brand_name,
        description: row.brand_description,
        created_at: row.brand_created_at,
        updated_at: row.brand_updated_at,
      },
      category: {
        category_id: row.category_id,
        title: row.category_title,
        name: row.category_name,
        description: row.category_description,
        created_at: row.category_created_at,
        updated_at: row.category_updated_at
      }
    }
  })

  let optionGroups = await OptionGroup.findAll();
  let options = await Option.findAll();

  products = products.map(product => {
    const productOptionGroups = optionGroups.filter(og => og.product_id === product.product_id);
    
    let option_groups = [];
    
    if(productOptionGroups.length > 0){
      option_groups = productOptionGroups.map(og => {
        const optionsToUse = options.filter(opt => opt.option_group.option_group_id === og.option_group_id);
        return {
          ...og,
          options: optionsToUse
        }
      });
    }

    return {
      ...product,
      option_groups
    }
  });

  return products;
}

const findByProductId = async (product_id) => {
  const products = await findAll();
  const results = products.filter(p => p.product_id === product_id);
  return results.length === 1
  ? results[0]
  : null;
}

module.exports = {
  findAll,
  findByProductId
}