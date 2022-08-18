// import {purchaseShip, getShipList, updateCapacity} from '../composables/models/ship.js';
import ship from '../composables/models/ship.js';

test('purchaseShip should be defined', () => {
  const shipBought = ship.purchaseShip('SteamRocket V1');
  expect(shipBought).toBeDefined();
});

test('purchaseShould should return a random ship when no parameters are entered', () => {
  const shipBought = ship.purchaseShip();
  expect(shipBought).toBeDefined();
});

test('Ship list should contain 3 ships', () => {
  expect(ship.getShipList()).toHaveLength(3);
});

test('updateCapacity should decrease cargo bij 100', () => {
  const shipBought = ship.purchaseShip();
  const expectedResult = shipBought.capacity - 100;
  shipBought.cargo.push({
    quantity: 100,
  });
  ship.updateCapacity(shipBought);
  expect(shipBought.capacity).toEqual(expectedResult);
});

test ('getProductFromCargo should return a product', () => {
  expect(ship.getProductFromCargo({ship: {cargo: [{name: 'test'}]}}, 'test')).toEqual({name: 'test'})
})

test('purchaseShip should return the correct ship', () => {
  const shipBought = ship.purchaseShip('SteamRocket V1');
  expect(shipBought.name).toEqual('SteamRocket V1');
});
