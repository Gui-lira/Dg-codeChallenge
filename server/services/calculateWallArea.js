const getAll = require('./getAll');

const calculateArea = async (heigth, width, doors, windows) => {
  const measures = await getAll('Measures');
  const { window } = measures.find((measure) => Object.keys(measure).includes('window'));
  const { door } = measures.find((measure) => Object.keys(measure).includes('door'));
  const doorArea = Number(door.heigth) * Number(door.width) * Number(doors);
  const windowArea = Number(window.heigth) * Number(window.width) * Number(windows);
  const wallArea = Number(heigth) * Number(width);
  const notWall = (doorArea) + (windowArea);
  const usableArea = wallArea - notWall;
  return { usableArea, wallArea };
};

module.exports = calculateArea;
