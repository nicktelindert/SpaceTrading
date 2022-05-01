import {getPlayerList, getHumanPlayer, createNewPlayer, checkForWinners, getNonHumanPlayers} from '../models/player.js';
import {purchaseShip, addProductToCargo, removeProductFromCargo, updateProductQuantityInCargo} from '../models/ship.js';

const playerList = getPlayerList();


test('getPlayerList should generate 4 players', () => {
  expect(playerList).toHaveLength(4);
});

test('createNewPlayer should create a human player', () => {
  createNewPlayer(purchaseShip(), 'Henk');
  const res = getHumanPlayer();
  expect(res.ai).toBeFalsy();
});

test('checkForWinners should return false', () => {
  const res = checkForWinners(2000000);
  expect(res).toBeFalsy();
});


test('getNonHumanPlayers should return 4 players', () => {
  expect(getNonHumanPlayers()).toHaveLength(4);
});

test('getNonHumanPlayers should all have AI set to true', () => {
  const players = getNonHumanPlayers();
  players.forEach((player) => {
    expect(player.ai).toBeTruthy();
  });
});

test('Add a product to players cargo', () => {
  const player = getHumanPlayer();
  addProductToCargo(player, 3, 34, 'product');
  expect(player.ship.cargo).toHaveLength(1);
});

test('Update product quantity in cargo', () => {
  const player = getHumanPlayer();
  updateProductQuantityInCargo(player, 'product', 33);
  expect(player.ship.cargo).toHaveLength(1);
  expect(player.ship.cargo[0]).toBeDefined();
  expect(player.ship.cargo[0].quantity).toEqual(33);
});

test('Remove product from cargo', () => {
  const player = getHumanPlayer();
  removeProductFromCargo(player, 'product');
  expect(player.ship.cargo).toHaveLength(0);
});


