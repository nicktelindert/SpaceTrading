import {getPlanetList, setCurrentPlanet, getCurrentPlanet, getMarketProductByName, getMarketValue} from '../composables/models/planet.js';

const planets = getPlanetList();
const productName = 'Purple Bananas';

test( 'getPlanetList should return a list with 6 planets', () => {
  expect(planets).toHaveLength(6);
});

test('setCurrentPlanet should save currentPlanet', () => {
  setCurrentPlanet('Xena');
  const result = getCurrentPlanet();
  expect(result.name).toEqual('Xena');
});


test('getMarketProductByName should return the right product', () => {
  setCurrentPlanet('Xena');
  expect(getMarketProductByName(productName).name).toEqual(productName);
});

test('getMarketValue should return a value', () => {
  setCurrentPlanet('Xena');
  expect(getMarketValue(productName)).toBeGreaterThanOrEqual(1);
});
