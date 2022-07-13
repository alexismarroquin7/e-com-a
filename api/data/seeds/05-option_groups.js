const option_groups = require('../dummy_data/option_groups');

exports.seed = function(knex) {
  return knex('option_groups').insert(option_groups);
};
