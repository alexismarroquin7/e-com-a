const inventory = require('../dummy_data/inventory');

exports.seed = function(knex) {
  return knex('inventory').insert(inventory);
};
