import {jest} from '@jest/globals';
import planet from '../composables/models/planet.js';
import product from '../composables/models/product.js';

const planets = planet.getPlanetList();
const productName = 'Purple Bananas';

product.generateProductList = jest.fn().mockReturnValue([{
  name: productName,
  price: 200,
  totalPrice: 600,
  quantity: 3,
}]);

test( 'getPlanetList should return a list with 6 planets', () => {
  expect(planets).toHaveLength(6);
});

test ('setCurrentPlanet should call setItem on localStorage', () => {
  jest.spyOn(localStorage, 'setItem')
  planet.setCurrentPlanet('Xena')
  expect(localStorage.setItem).toBeCalled()
})

test('getMarketProductByName', () => {
  planet.setCurrentPlanet('Xena');
  expect(planet.getMarketProductByName(productName)).toBeDefined();
});

test('getMarketValue should return a value', () => {
  expect(planet.getMarketValue(productName)).toBeGreaterThanOrEqual(1);
});
