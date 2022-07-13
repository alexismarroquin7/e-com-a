const categories = require('../dummy_data/categories');

exports.seed = function(knex) {
  return knex('categories').insert(categories);
};
