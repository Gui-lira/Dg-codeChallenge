const connection = require('./connection');

const get = async (collectionName, params) => {
  const db = await connection();
  const result = await db.collection(collectionName).find(params).toArray();
  return result;
};

module.exports = get;
