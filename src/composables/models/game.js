import planet from './planet.js';
import ship from './ship.js';
import player from './player.js';
import { generateMinMaxNumber } from '../utils/numbers.js';
import product from './product.js';
const financialGoal = 100000;
let gameNumber = 0;
let round = 0;

const createNewGame = (playerName, ship) => {
  if (playerName && ship) {
    player.createNewPlayer(ship, playerName);
  }

  round = 1;

  localStorage.setItem('currentRound', round);
};

const startGame = (newGame = true) => {
  gameNumber = localStorage.getItem('currentGame')
  if (newGame) {
    gameNumber = 1;
  }

  gameNumber++;

  localStorage.setItem('currentGame', gameNumber);
};

const startRound = (planetName) => {
  planet.getPlanetList(true);
  planet.setCurrentPlanet(planetName);
};

const buyProduct = (name, amount, playerObj) => {
  const selectedProduct = planet.getMarketProductByName(name);
  if (amount > playerObj.ship.capacity) {
    return false;
  }
  if (selectedProduct) {
    const totalPrice = amount * selectedProduct.price;
    if (totalPrice < playerObj.balance) {
      player.updateBalance(playerObj, -totalPrice);
      product.updateQuantity(selectedProduct, -amount);
      ship.addProductToCargo(playerObj, amount, selectedProduct.price, selectedProduct.name);
      player.updatePlayer(playerObj);

      return true;
    } else {
      return false;
    }
  }
};

const sellProduct = (idx, amount, playerObj) => {
  const selectedProduct = playerObj.ship.cargo[idx]
  if (selectedProduct) {
    const name = selectedProduct.name
    const planetProduct = planet.getMarketProductByName(name);
    if (selectedProduct && amount <= selectedProduct.quantity && planetProduct) {
      const totalPrice = amount * planetProduct.price;
      player.updateBalance(playerObj, totalPrice);
      if (amount < selectedProduct.quantity) {
        ship.updateProductQuantityInCargo(playerObj, idx, parseInt(selectedProduct.quantity - amount));
      } else {
        ship.removeProductFromCargo(playerObj, idx);
      }
      planet.getCurrentPlanet().market = planet.getCurrentPlanet().market.filter((val) => val.name !== name);
      product.updateQuantity(planetProduct, parseInt(amount));
      planet.getCurrentPlanet().market.push(planetProduct);
      player.updatePlayer(playerObj);
      return true;
    } else {
      return false;
    }
  }

};

const endRound = () => {
  letAiPlay();

  round = localStorage.getItem('currentRound')
  if (round === 12) {
    const goal = financialGoal * gameNumber;
    if (player.checkForWinners(goal)) {
      if (!player.isThereAHumanPlayer()) {
        return false;
      }
    } else {
      return false;
    }
  }

  round++;

  localStorage.setItem('currentRound', round);

  return false;
};

const letAiPlay = () => {
  const planetList = planet.getPlanetList();
  const nonHumanPlayers = player.getNonHumanPlayers();
  nonHumanPlayers.forEach((nonHumanPlayer) => {
    const currentPlanet = planetList[generateMinMaxNumber(0, (planetList.length - 1))];
    if (nonHumanPlayer.ship.cargo.length > 0) {
      nonHumanPlayer.ship.cargo.forEach((product, idx) => {
        sellProduct(idx, product.quantity, nonHumanPlayer);
      });
    } else {
      buyProduct(currentPlanet.market[generateMinMaxNumber(0, currentPlanet.market.length - 1)].name, (nonHumanPlayer.ship.capacity / 4), nonHumanPlayer);
    }

  });

  return true;
};

const game = {
  createNewGame, gameNumber, round, startGame, letAiPlay, startRound, endRound, buyProduct, sellProduct,
};

export default game;
