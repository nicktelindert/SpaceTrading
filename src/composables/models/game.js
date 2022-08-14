import planet from './planet.js';
import ship from './ship.js';
import player from './player.js';
import {generateMinMaxNumber} from '../utils/numbers.js';
import product from './product.js';
const financialGoal = 100000;
let gameNumber = 0;
let round = 0;

const createNewGame = (playerName, ship) => {
  if (playerName && ship) {
    player.createNewPlayer(ship, playerName);
  }

  round = 1;
};

const startGame = (newGame = true) => {
  if (newGame) {
    gameNumber = 1;
  }

  gameNumber++;
};

const startRound = (planetName) => {
  planet.getPlanetList(true);
  planet.setCurrentPlanet(planetName);
};

const buyProduct = (name, amount, human) => {
  const selectedProduct = planet.getMarketProductByName(name);
  if (amount > human.ship.capacity) {
    return false;
  }
  if (selectedProduct) {
    const totalPrice = amount * selectedProduct.price;
    if (totalPrice < human.balance) {
      player.updateBalance(human, -totalPrice);
      product.updateQuantity(selectedProduct, -amount);
      ship.addProductToCargo(human, amount, selectedProduct.price, selectedProduct.name);
      player.updatePlayer(human);
      return true;
    } else {
      return false;
    }
  }
};

const sellProduct = (name, amount, human) => {
  const selectedProduct = ship.getProductFromCargo(human, name);
  const planetProduct = planet.getMarketProductByName(name);
  if (selectedProduct && amount <= selectedProduct.quantity && planetProduct) {
    const totalPrice = amount * planetProduct.price;
    player.updateBalance(human, totalPrice);
    if (amount < selectedProduct.quantity) {
      ship.updateProductQuantityInCargo(human, name, parseInt(selectedProduct.quantity - amount));
    } else {
      ship.removeProductFromCargo(human, name);
    }
    planet.getCurrentPlanet().market = planet.getCurrentPlanet().market.filter((val) => val.name !== name);
    product.updateQuantity(planetProduct, parseInt(amount));
    planet.getCurrentPlanet().market.push(planetProduct);
    player.updatePlayer(human);
    return true;
  } else {
    return false;
  }
};

const endRound = () => {
  // 1. Let AI players make some decisions
  letAiPlay();
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
  return round;
};

const letAiPlay = () => {
  const planetList = planet.getPlanetList();
  const nonHumanPlayers = player.getNonHumanPlayers();
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

const game = {
  createNewGame, gameNumber, round, startGame, letAiPlay, startRound, endRound, buyProduct, sellProduct,
};

export default game;
