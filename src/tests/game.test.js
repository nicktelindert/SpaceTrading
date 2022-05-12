import game from '../composables/models/game.js';
import ship from '../composables/models/ship.js';
import player from '../composables/models/player.js';
const productName = 'Purple Bananas';
import {jest} from '@jest/globals';
import planet from '../composables/models/planet';

const shipModel = {
  'name': 'Ship',
  'cargo': [],
  'capacity': 100,
  'capacityUsed': 0,
  'capacityFull': 100,
};

planet.getCurrentPlanet = (() => {
  return {
    'name': 'Xena',
    'market': [],
  };
});

planet.getMarketProductByName = jest.fn().mockReturnValue({
  name: productName,
  price: 123,
});

ship.purchaseShip = jest.fn().mockReturnValue(shipModel);


player.getHumanPlayer = jest.fn().mockReturnValue({
  'name': 'Player',
  'ai': false,
  'balance': 20000,
  'ship': shipModel,
});

player.getPlayerList = jest.fn().mockReturnValue([{
  'name': 'Computer',
  'ai': true,
}]);

game.createNewGame('Player One', ship.purchaseShip('Ship'));
test('Game round should be equal to 0', () => {
  game.startGame(true);
  expect(game.round).toEqual(0);
});


test('Buy a product', () => {
  game.startRound('Xena');
  expect(game.buyProduct(productName, 13, player.getHumanPlayer())).toBeTruthy();
});

test('Buy a product should now return false', () => {
  game.startRound('Xena');
  expect(game.buyProduct(productName, 10000000, player.getHumanPlayer())).toBeFalsy();
});

test('Sell product should return false', () => {
  game.startRound('Xena');
  expect( game.sellProduct(productName, 19, player.getHumanPlayer())).toBeFalsy();
});

test('Sell product should return false because there is no room left', () => {
  game.startRound('Xena');
  expect( game.sellProduct(productName, player.getHumanPlayer().ship.capacity+1, player.getHumanPlayer())).toBeFalsy();
});

test('Sell product should return true', () => {
  game.startRound('Xena');
  expect( game.sellProduct(productName, 12, player.getHumanPlayer())).toBeTruthy();
});

test('endRound should return false', () => {
  for (let t=0; t<11; t++) {
    game.startRound('Xena');
    game.endRound();
  }
  expect(game.endRound()).toEqual(false);
});

test('letAiPlay should return true', () => {
  expect(game.letAiPlay()).toBeTruthy();
});
