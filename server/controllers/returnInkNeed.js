const { calculateArea, getInkNeed } = require('../services');

const returnNeed = async (req, res) => {
  const { walls } = req.body;
  const totalArea = await (await Promise.all(walls.map(async (wall) => calculateArea(wall))))
    .reduce((acumulator, { usableArea }) => acumulator + usableArea, 0);
  const inkNeeded = await getInkNeed(totalArea);
  return res.status(200).json(inkNeeded);
};

module.exports = returnNeed;
