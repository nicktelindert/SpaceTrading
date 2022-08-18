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
  'price': 1000
};


ship.purchaseShip = jest.fn().mockReturnValue(shipModel);


test('createNewPlayer should create a human player', () => {
  player.createNewPlayer(ship.purchaseShip(), 'Henk');
  const res = player.getHumanPlayer();
  expect(res.ai).toBeFalsy();
  expect(res.balance).toBeGreaterThan(0)
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

test ('isThereAHumanPlayer should be truthy', () => {
  expect(player.isThereAHumanPlayer()).toBeTruthy()
})

test ('updatePlayer should call localStorage.setItem', () =>{
  const res = player.getHumanPlayer();
  player.updatePlayer(res)
  jest.spyOn(localStorage, 'setItem').mockReturnThis()
  
  expect(localStorage.setItem).toBeCalled()
})

test('Add a product to players cargo', () => {
  ship.addProductToCargo(player.getHumanPlayer(), 3, 34, 'product');
  expect(player.getHumanPlayer().ship.cargo).toHaveLength(1);
});

test('Update product quantity in cargo', () => {
  ship.updateProductQuantityInCargo(player.getHumanPlayer(), 0, 33);
  expect(player.getHumanPlayer().ship.cargo).toHaveLength(1);
  expect(player.getHumanPlayer().ship.cargo[0]).toBeDefined();
  expect(player.getHumanPlayer().ship.cargo[0].quantity).toEqual(33);
});

test ('updateBalance should increase player balance', () => {
  player.balance = 0
  player.updateBalance(player, 10)
  expect(player.balance).toEqual(10)
})

test ('checkForWinners should call getPlayerList', () => {
  jest.spyOn(player, 'getPlayerList').mockReturnValue([{name: 'player', balance: 100}])
  player.checkForWinners(100)
  expect(player.getPlayerList).toBeCalled()
})

test('Remove product from cargo', () => {
  ship.removeProductFromCargo(player.getHumanPlayer(), 'product');
  expect(player.getHumanPlayer().ship.cargo).toHaveLength(0);
});


