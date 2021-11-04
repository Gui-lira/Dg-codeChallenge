const { getByName, calculateArea } = require('../services');

const validateWallArea = async (req, res, next) => {
  const { walls } = req.body;
  const { max, min } = await getByName('Measures', 'wall');
  let validation = true;
  await Promise.all(walls.map(async (element) => {
    const { usableArea, wallArea } = await calculateArea(element);
    if (wallArea < min || wallArea > max) {
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
