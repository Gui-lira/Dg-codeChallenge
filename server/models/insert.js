const connection = require('./connection');

const insert = async (collectionName, elements) => {
  const db = await connection();
  const { ops } = await db.collection(collectionName).insertMany(elements);
  return ops;
};

module.exports = insert;
