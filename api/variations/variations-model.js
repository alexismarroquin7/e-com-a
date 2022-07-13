const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('variations as v')
  .join('options as o', 'o.option_id', 'v.option_id')
  .join('option_groups as og', 'og.option_group_id', 'o.option_group_id');

  const variations = rows.map(row => {
    return {
      variation_id: row.variation_id,
      sku: row.sku,
      created_at: row.variation_created_at,
      updated_at: row.variation_updated_at,
      
      option: {
        option_id: row.option_id,
        value: row.option_value,
        created_at: row.option_created_at,
        updated_at: row.option_updated_at,
      },
      
      option_group: {
        option_group_id: row.option_group_id,
        name: row.option_group_name,
        title: row.option_group_title,
        created_at: row.option_group_created_at,
        updated_at: row.option_group_updated_at,
      }
    }
  
  });

  return variations;
}

const findBySku = async (sku) => {
  const results = await findAll();

  const filteredBySku = results.filter(variation => variation.sku === sku);
  return filteredBySku.length > 0
  ? filteredBySku
  : null;

}

module.exports = {
  findAll,
  findBySku
}