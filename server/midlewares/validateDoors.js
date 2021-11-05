const { getByName } = require('../services');

const validateDoors = async (req, res, next) => {
  const { walls } = req.body;
  const { door: { heigth } } = await getByName('Measures', 'door');
  const validation = walls.some((wall) => wall.door > 0 && wall.heigth - 30 < heigth);
  if (validation) return res.status(401).json({ message: 'invalid heigth' });
  next();
};

module.exports = validateDoors;
