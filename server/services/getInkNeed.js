const getByName = require('./getByName');

const getInkNeed = async (area) => {
  const { ink } = await getByName('Measures', 'ink');
  const { utility, recipients } = ink;
  let litersNeed = area / utility;
  console.log(litersNeed);
  const inkQuantity = {};
  recipients.forEach((recipient) => {
    inkQuantity[recipient] = 0;
  });
  while (litersNeed > 0) {
    for (let index = recipients.length - 1; index > -1; index -= 1) {
      if (litersNeed - recipients[index] > -1) {
        inkQuantity[recipients[index]] += 1;
        litersNeed -= recipients[index];
        break;
      }
    }
  }
  return inkQuantity;
};

module.exports = getInkNeed;
