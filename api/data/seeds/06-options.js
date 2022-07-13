const options = require('../dummy_data/options');

exports.seed = function(knex) {
  return knex('options').insert(options);
};
