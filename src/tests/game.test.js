import game from '../composables/models/game.js';
import product from '../composables/models/product.js';
import ship from '../composables/models/ship.js';
import player from '../composables/models/player.js';

import {jest} from '@jest/globals';
import planet from '../composables/models/planet';

const shipModel = {
  'name': 'Ship',
  'cargo': [],
  'capacity': 100,
  'capacityUsed': 0,
  'capacityFull': 100,
};
const productName = 'Purple Bananas';


beforeAll (() => {
  jest.spyOn(localStorage, 'setItem').mockReturnValue(true)
  jest.spyOn(localStorage, 'getItem').mockReturnValue()
  jest.spyOn(planet, 'getMarketProductByName').mockReturnValue({
    name: productName,
    price: 12.50
  })

  jest.spyOn(planet, 'getCurrentPlanet').mockReturnValue({ name: 'Xena', market: []})
  jest.spyOn(planet, 'getMarketProductByName').mockReturnValue({'name': productName, 'quantity': 15, 'price': 10 })
  jest.spyOn(planet, 'getPlanetList').mockReturnValue([{'name': 'Xena', 'market': [{'name': productName, 'quantity': 15, 'price': 10 }]}])
  jest.spyOn(planet, 'setCurrentPlanet').mockReturnThis()

  jest.spyOn(product, 'updateQuantity').mockReturnThis()
 

  jest.spyOn(player, 'updateBalance').mockReturnThis()
  jest.spyOn(player, 'checkForWinners').mockReturnValue(true)
  jest.spyOn(player, 'getNonHumanPlayers').mockReturnValue([{'name': 'computer', 'ai': true, 'ship': shipModel}])
  jest.spyOn(player, 'isThereAHumanPlayer').mockReturnValue(true)

  jest.spyOn(player, 'updatePlayer').mockReturnThis()
  jest.spyOn(player,'getPlayerList').mockReturnValue([{
    'name': 'Computer',
    'ai': true,
  }]);

  jest.spyOn(ship, 'getProductFromCargo').mockReturnValue({'name': productName, 'quantity': 15 })
  jest.spyOn(ship, 'updateProductQuantityInCargo').mockReturnThis()
  jest.spyOn(ship, 'removeProductFromCargo').mockReturnThis()
  jest.spyOn(ship, 'purchaseShip').mockReturnValue(shipModel)

  jest.spyOn(game, 'sellProduct')


  game.createNewGame('Player One', ship.purchaseShip('Ship'));
  
})

beforeEach(() => {
  jest.spyOn(player, 'getHumanPlayer').mockReturnValue({ 
    'name': 'Player',
    'ai': false,
    'balance': 20000,
    'ship': shipModel
  })
})


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

test ('Buy a product should return false becuase of insufficient balance', () => {
  jest.spyOn(player, 'getHumanPlayer').mockReturnValue({ 
    'name': 'Player',
    'ai': false,
    'balance': 0,
    'ship': shipModel
  })
  expect(game.buyProduct(productName, 13, player.getHumanPlayer())).toBeFalsy();

})
test('Sell product should return false', () => {
  game.startRound('Xena');
  expect( game.sellProduct(0, 19, player.getHumanPlayer())).toBeFalsy();
});

test('Sell product should return false because we sell more than we have', () => {
  game.startRound('Xena');
  expect( game.sellProduct(0, player.getHumanPlayer().ship.capacity+1, player.getHumanPlayer())).toBeFalsy();
});

test('Sell product should return true', () => {
  game.startRound('Xena');
  jest.spyOn(player, 'getHumanPlayer').mockReturnValue({ 
    'name': 'Player',
    'ai': false,
    'balance': 50000,
    'ship': shipModel
  })

  expect( game.sellProduct(0, 13, player.getHumanPlayer())).toBeTruthy();
});

test('Sell product should call ship.removeProductFromCargo', () => {
  game.startRound('Xena');
  game.sellProduct(0, 15, player.getHumanPlayer())
  expect(ship.removeProductFromCargo).toBeCalled();
});


test('endRound should return false', () => {
  for (let t=0; t<11; t++) {
    game.startRound('Xena');
    game.endRound();
  }
  expect(game.endRound()).toEqual(false);
});

test ('player.checkForWinnners should be called', () => {
  jest.spyOn(localStorage, 'getItem').mockReturnValue(12);
  game.endRound();
  expect(player.checkForWinners).toBeCalled();
})


test ('endRound should return false because there is no humanplayer left', () => {
  jest.spyOn(localStorage, 'getItem').mockReturnValue(12);
  jest.spyOn(player,'isThereAHumanPlayer').mockReturnValue(false);
  game.endRound();
  expect(game.endRound()).toBeFalsy();
})

test ('endRound should return false because there is no winner', () => {
  jest.spyOn(localStorage, 'getItem').mockReturnValue(12);
  jest.spyOn(player,'checkForWinners').mockReturnValue(false);
  game.endRound();
  expect(game.endRound()).toBeFalsy();
})


test('letAiPlay should return true', () => {
  expect(game.letAiPlay()).toBeTruthy();
});


test('letAiPlay should call sellProduct', () => {
  shipModel.cargo = [{name: productName, price: 12.50, quantity: 12}]
  jest.spyOn(player, 'getNonHumanPlayers').mockReturnValue([{'name': 'computer', 'ai': true, balance: 50000, 'ship': shipModel}])
  game.letAiPlay()
  expect(game.sellProduct).toBeCalled();
});