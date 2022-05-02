import {getPlanetList, getCurrentPlanet, setCurrentPlanet, getMarketProductByName} from './planet.js';
import {getProductFromCargo, removeProductFromCargo, updateProductQuantityInCargo, addProductToCargo} from './ship.js';
import {createNewPlayer, checkForWinners, isThereAHumanPlayer, getNonHumanPlayers} from './player.js';
import {generateMinMaxNumber} from '../utils/numbers.js';

const financialGoal = 100000;
let game = 0;
let round = 0;

const createNewGame = (playerName, ship) => {
  if (playerName && ship) {
    createNewPlayer(ship, playerName);
  }

  round = 1;
};

const startGame = (newGame = true) => {
  if (newGame) {
    game = 1;
  }

  game++;
};

const startRound = (planetName) => {
  getPlanetList(true);
  setCurrentPlanet(planetName);
};

const buyProduct = (name, amount, player) => {
  const selectedProduct = getMarketProductByName(name);
  if (amount > player.ship.capacity) {
    return false;
  }
  if (selectedProduct) {
    const totalPrice = amount * selectedProduct.price;
    if (totalPrice < player.balance) {
      player.updateBalance(-totalPrice);
      selectedProduct.updateQuantity(-amount);
      addProductToCargo(player, amount, totalPrice, selectedProduct.name);
      return true;
    } else {
      return false;
    }
  }
};

const sellProduct = (name, amount, player) => {
  const selectedProduct = getProductFromCargo(player, name);
  const planetProduct = getMarketProductByName(name);
  if (selectedProduct && amount <= selectedProduct.quantity && planetProduct) {
    const totalPrice = amount * planetProduct.price;
    player.updateBalance(totalPrice);
    if (amount < selectedProduct.quantity) {
      updateProductQuantityInCargo(player, name, parseInt(selectedProduct.quantity - amount));
    } else {
      removeProductFromCargo(player, name);
    }
    getCurrentPlanet().market = getCurrentPlanet().market.filter((val) => val.name !== name);
    planetProduct.updateQuantity(parseInt(amount));
    getCurrentPlanet().market.push(planetProduct);

    return true;
  } else {
    return false;
  }
};

const endRound = () => {
  // 1. Let AI players make some decisions
  letAiPlay();
  if (round === 12) {
    const goal = financialGoal * game;
    if (checkForWinners(goal)) {
      if (!isThereAHumanPlayer()) {
        return false;
      }
    } else {
      return false;
    }
  }

  round++;
  return round;
};

const letAiPlay = () => {
  const planetList = getPlanetList();
  const nonHumanPlayers = getNonHumanPlayers();
  nonHumanPlayers.forEach((nonHumanPlayer) => {
    if (nonHumanPlayer.ai) {
      const currentPlanet = planetList[generateMinMaxNumber(0, (planetList.length-1))];
      if (nonHumanPlayer.ship.cargo.length >0) {
        nonHumanPlayer.ship.cargo.forEach((product) => {
          sellProduct(product.name, product.quantity, nonHumanPlayer);
        });
      } else {
        buyProduct(currentPlanet.market[generateMinMaxNumber(0, currentPlanet.market.length-1)].name, (nonHumanPlayer.ship.capacity/4), nonHumanPlayer);
      }
    }
  });

  return true;
};

export {createNewGame, game, round, startGame, letAiPlay, startRound, endRound, buyProduct, sellProduct};
