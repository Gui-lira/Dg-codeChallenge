const { getAll } = require('.');

const calculateArea = async (wall) => {
  const measures = await getAll('Measures');
  const { window } = measures.find((measure) => Object.keys(measure).includes('window'));
  const { door } = measures.find((measure) => Object.keys(measure).includes('door'));
  const doorArea = door.heigth * door.width;
  const windowArea = window.heigth * window.width;
  const wallArea = wall.heigth * wall.width;
  const notWall = (wall.doors * doorArea) + (wall.windows * windowArea);
  const usableArea = wallArea - notWall;
  return { usableArea, wallArea };
};

module.exports = calculateArea;
