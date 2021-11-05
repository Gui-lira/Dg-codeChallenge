const { calculateArea, getInkNeed } = require('../services');

const returnNeed = async (req, res) => {
  const { walls } = req.body;
  const previusArr = await Promise.all(walls.map(async (element) => calculateArea(
    element.height, element.width, element.doors, element.window,
  )));
  const totalArea = previusArr.reduce((acumulator, wall) => acumulator + wall.usableArea, 0);
  const inkNeeded = await getInkNeed(totalArea);
  return res.status(200).json(inkNeeded);
};

module.exports = returnNeed;
