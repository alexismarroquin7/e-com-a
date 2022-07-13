const brands = require('../dummy_data/brands');

exports.seed = function(knex) {
  return knex('brands').insert(brands);
};
