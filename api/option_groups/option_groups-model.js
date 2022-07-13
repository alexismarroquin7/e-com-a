const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('option_groups as og');
  
  const option_groups = rows.map(row => {
    return {
      option_group_id: row.option_group_id,
      name: row.option_group_name,
      title: row.option_group_title,
      created_at: row.option_group_created_at,
      updated_at: row.option_group_updated_at,
      product_id: row.product_id,
    }
  })

  return option_groups;
}

const findByProductId = async (product_id) => {
  const rows = await db('option_groups as og')
  .where({product_id});

  if(rows.length === 0) return null;

  const option_groups = rows.map(row => {
    return {
      option_group_id: row.option_group_id,
      name: row.option_group_name,
      title: row.option_group_title,
      created_at: row.option_group_created_at,
      updated_at: row.option_group_updated_at,
      product_id: row.product_id,
    }
  })

  return option_groups;
}

module.exports = {
  findAll,
  findByProductId
}