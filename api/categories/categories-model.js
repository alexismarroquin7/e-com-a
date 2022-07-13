const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('categories as c');
  return rows;
}

module.exports = {
  findAll
}