import product from '../composables/models/product.js';

test('product list should return an array of length 10', () => {
  const productList = product.generateProductList();
  expect(productList).toHaveLength(10);
});

test('Expect getMarketValuePrice to be bigger than 0', () => {
  product.generateProductList();
  expect(product.getMarketValuePrice('Purple Bananas')).toBeGreaterThanOrEqual(0);
});

test('Expect getMarketValuePrice to be 0', () => {
  product.generateProductList();
  expect(product.getMarketValuePrice('green banana')).toEqual(0);
});


test('Expect getMarketValue to be an object', () => {
  product.generateProductList();
  expect(product.getMarketValue('Purple Bananas')).toBeInstanceOf(Object);
});

test('Expect getMarketValues to be an array of length 10', () => {
  product.generateProductList();
  const marketValues = product. getMarketValues();
  expect(marketValues).toHaveLength(10);
});
