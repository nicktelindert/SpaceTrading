import ship from './ship.js';

const names = [
  'Mars Trading inc.',
  'MoMoney Inc.',
  'A.C.M.E',
  'DollarSigns Inc.',
];

const list = localStorage.getItem('playerList') ? JSON.parse(localStorage.getItem('playerList')) : [];

const createNewPlayer = (ship, playerName) => {
  if (ship) {
    let ai = true;
    let name;
    if (playerName) {
      ai = false;
      name = playerName;
    } else {
      name = names.pop();
    }

    list.push({
      name: name,
      ai: ai,
      balance: 50000 - ship.price,
      ship: ship,
    });
    localStorage.setItem('playerList', JSON.stringify(list));
  }
};


const getPlayerList = () => {
  if (list.length <=1) {
    for (let t=0; t < 4; t++) {
      createNewPlayer(ship.purchaseShip());
    }
  }

  return list;
};

const updateBalance = (player, sum) => {
  player.balance = parseInt(player.balance) + parseInt(sum);
};

const checkForWinners = (currentGoal) => {
  const players = list.filter((player) => player.balance >= currentGoal);

  if (players.length === 1) {
    // We actually have a winner
    return true;
  }

  return false;
};

const getHumanPlayer = () => {
  const filter = list.filter( (val) => val.ai === false);
  if (filter.length === 1) {
    return filter[0];
  }
};

const getNonHumanPlayers = () => {
  return list.filter( (val) => val.ai === true);
};

const isThereAHumanPlayer = () => {
  // check if human player is still in the race
  return list.filter( (val) => val.ai === false).length >0;
};

const updatePlayer = (player) => {
  let updatedList = list;
  const searchPlayer = list.filter( (item) => item.name === player.name);
  if (searchPlayer.length >0) {
    updatedList = updatedList.filter((item) => item.name !== player.name);
    updatedList.push(player);
    localStorage.setItem('playerList', JSON.stringify(updatedList));
  }
};

const player = {
  getPlayerList, createNewPlayer, getHumanPlayer, isThereAHumanPlayer, checkForWinners, getNonHumanPlayers, updateBalance, updatePlayer,
};

export default player;
