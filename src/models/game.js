import planet from './planet.js';
import ship from './ship.js';
import player from './player.js';
import {generateMinMaxNumber} from '../utils/numbers.js';
import './product.js';

const FINANCIAL_GOAL = 100000;
let gameNumber = 0;
let round = 0;

const createNewGame = (playerName, ship) => {
  if (!playerName || !ship) {
    return;
  }

  player.addPlayer(ship, playerName);
  round = 1;
  localStorage.setItem('currentRound', round);
};

const startGame = (newGame = true) => {
  gameNumber = newGame ? 1 : Number(localStorage.getItem('currentGame')) + 1;
  localStorage.setItem('currentGame', gameNumber);
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

  if (!selectedProduct) {
    return false;
  }

  const totalPrice = amount * selectedProduct.price;
  if (totalPrice > human.balance) {
    return false;
  }

  player.updatePlayer(human, -totalPrice);
  human = player.getHumanPlayer();
  product.updateQuantity(selectedProduct, -amount);
  human = player.getHumanPlayer();
  ship.addProductToCargo(human, amount, selectedProduct.price, selectedProduct.name);
  player.updatePlayer(human);
  return true;
};

const sellProduct = (name, amount, human) => {
  const selectedProduct = ship.getProductFromCargo(human, name);

  const planetProduct = planet.getMarketProductByName(name);
  if (!selectedProduct || amount > selectedProduct.quantity || !planetProduct) {
    return false;
  }

  const totalPrice = amount * planetProduct.price;
  player.updatePlayer(human, totalPrice);
  human = player.getHumanPlayer();
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
};

const endRound = () => {
  // 1. Let AI players make some decisions
  letAiPlay();
  
  round = Number(localStorage.getItem('currentRound')) + 1;
  localStorage.setItem('currentRound', round);

  if (round !== 12) {
    return round;
  }

  const goal = FINANCIAL_GOAL * gameNumber;
  if (!player.checkForWinners(goal) || !player.isThereAHumanPlayer()) {
    return false;
  }

  return round;
};


const letAiPlay = () => {
  const planetList = planet.getPlanetList();
  const nonHumanPlayers = player.getAIPlayers();
  
  for (const nonHumanPlayer of nonHumanPlayers) {
    if (!nonHumanPlayer.ai) {
      continue;
    }
    
    if (nonHumanPlayer.ship.cargo.length > 0) {
      for (const product of nonHumanPlayer.ship.cargo) {
        sellProduct(product.name, product.quantity, nonHumanPlayer);
      }
    } else {
      const selectedPlanet = planetList[generateMinMaxNumber(0, planetList.length - 1)];
      const productToBuy = selectedPlanet.market[generateMinMaxNumber(0, selectedPlanet.market.length - 1)];
      const maxAmountToBuy = Math.floor(nonHumanPlayer.ship.capacity / 4);
      const amountToBuy = Math.min(maxAmountToBuy, productToBuy.quantity);
      buyProduct(productToBuy.name, amountToBuy, nonHumanPlayer);
    }
  }
};

const game = {
  createNewGame, gameNumber, round, startGame, letAiPlay, startRound, endRound, buyProduct, sellProduct,
};

export default game;
