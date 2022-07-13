const products = require('../dummy_data/products');

exports.seed = function(knex) {
  return knex('products').insert(products);
};
