const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('options as o')
  .join('option_groups as og', 'og.option_group_id', 'o.option_group_id')
  
  const options = rows.map(row => {
    return {
      option_id: row.option_id,
      value: row.option_value,
      created_at: row.option_created_at,
      updated_at: row.option_updated_at,
      
      option_group: {
        option_group_id: row.option_group_id,
        name: row.option_group_name,
        title: row.option_group_title,
        created_at: row.option_group_created_at,
        updated_at: row.option_group_updated_at,
      },

      product_id: row.product_id
    }
  })
  
  return options;
}

const findByOptionGroupId = async (option_group_id) => {
  const rows = await db('options as o')
  .join('option_groups as og', 'og.option_group_id', 'o.option_group_id')
  .where({'o.option_group_id': option_group_id});

  if(rows.length === 0) return null;

  const options = rows.map(row => {
    return {
      option_id: row.option_id,
      value: row.option_value,
      created_at: row.option_created_at,
      updated_at: row.option_updated_at,
      
      option_group: {
        option_group_id: row.option_group_id,
        name: row.option_group_name,
        title: row.option_group_title,
        created_at: row.option_group_created_at,
        updated_at: row.option_group_updated_at,
      },

      product_id: row.product_id
    }
  })
  return options;
}

const findByOptionId = async option_id => {
  const row = await db('options as o')
  .where({option_id})
  .first();
  return row ? row : null;
}

module.exports = {
  findAll,
  findByOptionId,
  findByOptionGroupId
}