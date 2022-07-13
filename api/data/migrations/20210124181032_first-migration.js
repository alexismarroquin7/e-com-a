exports.up = async (knex) => {
  await knex.schema
    .createTable('brands', (brands) => {
      brands.increments('brand_id');
      brands.string('brand_name')
      .unique()
      .notNullable();
      brands.string('brand_description');
      brands.timestamp('brand_created_at')
      .defaultTo(knex.fn.now()); 
      brands.timestamp('brand_updated_at')
      .defaultTo(knex.fn.now()); 
    })
    .createTable('categories', (categories) => {
      categories.increments('category_id');
      categories.string('category_title')
      .unique()
      .notNullable();
      categories.string('category_name')
      .unique()
      .notNullable();
      categories.string('category_description');
      categories.timestamp('category_created_at')
      .defaultTo(knex.fn.now()); 
      categories.timestamp('category_updated_at')
      .defaultTo(knex.fn.now()); 
    })
    .createTable('products', (products) => {
      products.increments('product_id');
      products.string('product_name')
      .unique()
      .notNullable();
      products.string('product_description');
      products.timestamp('product_created_at')
      .defaultTo(knex.fn.now()); 
      products.timestamp('product_updated_at')
      .defaultTo(knex.fn.now());

      products.integer('brand_id')
      .unsigned()
      .notNullable()
      .references('brand_id')
      .inTable('brands')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

      products.integer('category_id')
      .unsigned()
      .notNullable()
      .references('category_id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    })
    .createTable('option_groups', option_groups => {
      option_groups.increments('option_group_id')
      option_groups.string('option_group_name')
      .notNullable()
      option_groups.string('option_group_title')
      .notNullable()
      option_groups.timestamp('option_group_created_at')
      .defaultTo(knex.fn.now())
      option_groups.timestamp('option_group_updated_at')
      .defaultTo(knex.fn.now())
      option_groups.integer('product_id')
      .unsigned()
      .notNullable()
      .references('product_id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    })
    .createTable('options', options => {
      options.increments('option_id')
      options.string('option_value')
      .notNullable()
      options.timestamp('option_created_at')
      .defaultTo(knex.fn.now())
      options.timestamp('option_updated_at')
      .defaultTo(knex.fn.now())
      options.integer('option_group_id')
      .unsigned()
      .notNullable()
      .references('option_group_id')
      .inTable('option_groups')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    })
    .createTable('inventory', inventory => {
      inventory.increments('sku');
      inventory.decimal('price')
      .notNullable();
      inventory.integer('amount_in_stock')
      .notNullable();
      inventory.timestamp('inventory_created_at')
      .defaultTo(knex.fn.now());
      inventory.timestamp('inventory_updated_at')
      .defaultTo(knex.fn.now());
      inventory.integer('product_id')
      .unsigned()
      .notNullable()
      .references('product_id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    })
    .createTable('variations', variations => {
      variations.increments('variation_id')
      variations.timestamp('variation_created_at')
      .defaultTo(knex.fn.now());
      variations.timestamp('variation_updated_at')
      .defaultTo(knex.fn.now());
      variations.integer('option_id')
      .unsigned()
      .notNullable()
      .references('option_id')
      .inTable('options')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      variations.integer('sku')
      .unsigned()
      .notNullable()
      .references('sku')
      .inTable('inventory')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    });
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('variations')
  await knex.schema.dropTableIfExists('inventory')
  await knex.schema.dropTableIfExists('options')
  await knex.schema.dropTableIfExists('option_groups')
  await knex.schema.dropTableIfExists('products')
  await knex.schema.dropTableIfExists('categories')
  await knex.schema.dropTableIfExists('brands')
}
