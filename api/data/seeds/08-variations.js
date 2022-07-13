const variations = require('../dummy_data/variations');

exports.seed = function(knex) {
  return knex('variations').insert(variations);
};
