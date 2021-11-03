const { get } = require('../models');

const getByName = async (collectionName, name) => {
  const [element] = await get(collectionName, { [`${name}`]: { $exists: true } });
  return element;
};

module.exports = getByName;
