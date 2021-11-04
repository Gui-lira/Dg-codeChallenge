const { getAll } = require('../services');

const validateWallArea = async (req, res, next) => {
  const { walls } = req.body;
  const measures = await getAll('Measures');
  const { window } = measures.find((wall) => Object.keys(wall).includes('window'));
  const { door } = measures.find((wall) => Object.keys(wall).includes('door'));
  const { wall } = measures.find((element) => Object.keys(element).includes('wall'));
  const doorArea = door.heigth * door.width;
  const windowArea = window.heigth * window.width;
  let validation = true;
  walls.forEach((element) => {
    const wallArea = element.heigth * element.width;
    const notWall = (element.doors * doorArea) + (element.windows * windowArea);
    if (wallArea < wall.min || wallArea > wall.max) {
      validation = false;
    }
    if (notWall > wallArea / 2) {
      validation = false;
    }
  });
  if (!validation) return res.status(401).json({ message: 'invalid walls area' });
  next();
};

module.exports = validateWallArea;
