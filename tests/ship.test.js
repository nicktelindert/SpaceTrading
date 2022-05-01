import {purchaseShip, getShipList} from '../models/ship.js';

test('purchaseShip should be defined', () => {
  console.table(getShipList());
  const ship = purchaseShip('SteamRocket V1');
  expect(ship).toBeDefined();
});

test('purchaseShould should return a random ship when no parameters are entered', () => {
  const ship = purchaseShip();
  expect(ship).toBeDefined();
});

test('Ship list should contain 3 ships', () => {
  expect(getShipList()).toHaveLength(3);
});

test('updateCapacity should decrease cargo bij 100', () => {
  const ship = purchaseShip();
  const expectedResult = ship.getCapacity() - 100;
  ship.cargo.push({
    quantity: 100,
  });
  ship.updateCapacity();
  expect(ship.getCapacity()).toEqual(expectedResult);
});

test('purchaseShip should return the correct ship', () => {
  const ship = purchaseShip('SteamRocket V1');
  expect(ship.name).toEqual('SteamRocket V1');
});
