import {generateProductList, getMarketValuePrice, getMarketValues, getMarketValue} from '../composables/models/product.js';

test('product list should return an array of length 10', () => {
  const productList = generateProductList();
  expect(productList).toHaveLength(10);
  console.table(productList);
});

test('Expect getMarketValuePrice to be bigger than 0', () => {
  generateProductList();
  expect(getMarketValuePrice('Purple Bananas')).toBeGreaterThanOrEqual(0);
});

test('Expect getMarketValue to be an object', () => {
  generateProductList();
  expect(getMarketValue('Purple Bananas')).toBeInstanceOf(Object);
});

test('Expect getMarketValues to be an array of length 10', () => {
  generateProductList();
  generateProductList();
  const marketValues = getMarketValues();
  console.table(marketValues);
  expect(marketValues).toHaveLength(10);
});
