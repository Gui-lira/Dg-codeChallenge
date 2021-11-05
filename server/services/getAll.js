const { get } = require('../models');

const getAll = async (collectionName) => {
  const returnArr = await get(collectionName, {});
  return returnArr;
};

module.exports = getAll;
