import planet from '../composables/models/planet.js';

const planets = planet.getPlanetList();
const productName = 'Purple Bananas';

test( 'getPlanetList should return a list with 6 planets', () => {
  expect(planets).toHaveLength(6);
});

test('getMarketValue should return a value', () => {
  expect(planet.getMarketValue(productName)).toBeGreaterThanOrEqual(1);
});
