const { getByName, calculateArea } = require('../services');

const validateWallArea = async (req, res, next) => {
  const { walls } = req.body;
  const { wall } = await getByName('Measures', 'wall');
  console.log(wall);
  let validation = true;
  await Promise.all(walls.map(async (element) => {
    console.log(element);
    const {
      usableArea,
      wallArea,
    } = await calculateArea(element.height, element.width, element.doors, element.window);
    if (wallArea < wall.min || wallArea > wall.max) {
      validation = false;
    }
    if (usableArea < wallArea / 2) {
      validation = false;
    }
  }));
  if (!validation) return res.status(401).json({ message: 'invalid walls area' });
  next();
};

module.exports = validateWallArea;
