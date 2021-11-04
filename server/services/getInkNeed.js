const { getByName } = require('.');

const getInkNeed = async (area) => {
  const { ink: utility, recipients } = await getByName('Measures', 'ink');
  let litersNeed = area / utility;
  const inkQuantity = {};
  recipients.forEach((recipient) => {
    inkQuantity[recipient] = 0;
  });
  while (litersNeed > 0) {
    for (let index = recipients.length - 1; index > -1; index -= 1) {
      if (litersNeed - recipients[index] > -1) {
        inkQuantity[recipients[index]] += 1;
        litersNeed -= recipients[index];
      }
    }
  }
  return inkQuantity;
};

module.exports = getInkNeed;
