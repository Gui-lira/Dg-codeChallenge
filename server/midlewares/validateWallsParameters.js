const validateWallsParameters = (req, res, next) => {
  const { walls } = req.body;
  let validation = true;
  walls.forEach((wall) => {
    const numberArr = Object.values(wall);
    if (numberArr.some((number) => number < 0)) {
      validation = false;
    }
  });
  if (!validation) return res.status(401).json({ message: 'numbers are not negative' });
  next();
};

module.exports = validateWallsParameters;
