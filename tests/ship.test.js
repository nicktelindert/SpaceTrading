import {purchaseShip, getShipList, updateCapacity} from '../models/ship.js';

test('purchaseShip should be defined', () => {
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
  const expectedResult = ship.capacity - 100;
  ship.cargo.push({
    quantity: 100,
  });
  updateCapacity(ship);
  expect(ship.capacity).toEqual(expectedResult);
});

test('purchaseShip should return the correct ship', () => {
  const ship = purchaseShip('SteamRocket V1');
  expect(ship.name).toEqual('SteamRocket V1');
});
