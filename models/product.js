import {generateMinMaxNumber} from '../utils/numbers.js';

const productNames = [
  'Purple Bananas',
  'Thorium Bike',
  'Brown Apples',
  'Onion Flavoured Chocolade',
  'Ogre Puppy',
  'The Strange Behaviour Of Humans(Book)',
  'Animal Speech translator',
  'Fluffy Gun',
  'Pet Human',
  'Human biscuits',
];

let marketValues = [];

const generateProductList = () => {
  const list = [];

  productNames.forEach( (productName) => {
    const price = generateMinMaxNumber(10, 500);
    const quantity = generateMinMaxNumber(20, 100);

    recalculateMarketValue(productName, price);
    list.push({
      name: productName,
      price: price,
      totalPrice: price * quantity,
      quantity: quantity,
      updateQuantity: function(amount) {
        this.quantity = this.quantity + amount;
      },
    });
  });
  return list;
};


const recalculateMarketValue = (productName, price) => {
  const currentValue = getMarketValue(productName);
  if (currentValue) {
    marketValues = marketValues.filter(((val) => val.name !== productName));

    currentValue.round = parseInt(currentValue.round) + 1;
    currentValue.price = (parseInt(currentValue.price) + price) / currentValue.round;
    marketValues.push(currentValue);
  } else {
    marketValues.push({
      price: price,
      round: 1,
      name: productName,
    });
  }
};

const getMarketValue = (productName) => {
  const res = marketValues.filter(((val) => val.name == productName));
  if (res.length === 1) {
    return res[0];
  } else {
    return false;
  }
};

const getMarketValuePrice = (productName) => {
  const marketValue = getMarketValue(productName);
  if (marketValue) {
    return marketValue.price;
  }

  return 0;
};

const getMarketValues = () => marketValues;

export {generateProductList, getMarketValue, getMarketValuePrice, getMarketValues};
