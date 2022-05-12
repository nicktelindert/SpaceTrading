import player from '../composables/models/player.js';
// import {purchaseShip, addProductToCargo, removeProductFromCargo, updateProductQuantityInCargo} from '../composables/models/ship.js';
import ship from '../composables/models/ship.js';
import {jest} from '@jest/globals';
const shipModel = {
  'name': 'Ship',
  'cargo': [],
  'capacity': 100,
  'capacityUsed': 0,
  'capacityFull': 100,
};


ship.purchaseShip = jest.fn().mockReturnValue(shipModel);

const playerList = player.getPlayerList();


test('getPlayerList should generate 4 players', () => {
  expect(playerList).toHaveLength(4);
});

test('createNewPlayer should create a human player', () => {
  player.createNewPlayer(ship.purchaseShip(), 'Henk');
  const res = player.getHumanPlayer();
  expect(res.ai).toBeFalsy();
});

test('checkForWinners should return false', () => {
  const res = player.checkForWinners(2000000);
  expect(res).toBeFalsy();
});


test('getNonHumanPlayers should return 4 players', () => {
  expect(player.getNonHumanPlayers()).toHaveLength(4);
});

test('getNonHumanPlayers should all have AI set to true', () => {
  const players = player.getNonHumanPlayers();
  players.forEach((player) => {
    expect(player.ai).toBeTruthy();
  });
});

test('Add a product to players cargo', () => {
  ship.addProductToCargo(player.getHumanPlayer(), 3, 34, 'product');
  expect(player.getHumanPlayer().ship.cargo).toHaveLength(1);
});

test('Update product quantity in cargo', () => {
  ship.updateProductQuantityInCargo(player.getHumanPlayer(), 'product', 33);
  expect(player.getHumanPlayer().ship.cargo).toHaveLength(1);
  expect(player.getHumanPlayer().ship.cargo[0]).toBeDefined();
  expect(player.getHumanPlayer().ship.cargo[0].quantity).toEqual(33);
});

test('Remove product from cargo', () => {
  ship.removeProductFromCargo(player.getHumanPlayer(), 'product');
  expect(player.getHumanPlayer().ship.cargo).toHaveLength(0);
});


