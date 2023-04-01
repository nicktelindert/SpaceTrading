import ship from './ship.js';

const names = [
  'Mars Trading inc.',
  'MoMoney Inc.',
  'A.C.M.E',
  'DollarSigns Inc.',
];

// Helper function to generate a new player object
const createPlayer = (ship, playerName) => {
  const isAI = !playerName;
  const name = playerName || names.pop();
  const balance = 50000 - ship.price;

  return { name, isAI, balance, ship };
};

// Retrieve player list from local storage
const getPlayerList = () => {
  const savedList = localStorage.getItem('playerList');
  return savedList ? JSON.parse(savedList) : [];
};

// Create default AI players
const createDefaultPlayers = (count) => {
  const players = [];
  for (let i = 0; i < count; i++) {
    const newShip = ship.purchaseShip();
    const player = createPlayer(newShip);
    players.push(player);
  }
  return players;
};

// Initialize player list
const initPlayerList = () => {
  const playerList = getPlayerList();
  if (!playerList.length) {
    const defaultPlayers = createDefaultPlayers(4);
    localStorage.setItem('playerList', JSON.stringify(defaultPlayers));
    return defaultPlayers;
  }
  return playerList;
}

// Add a new player to the list
const addPlayer = (ship, playerName) => {
  const player = createPlayer(ship, playerName);
  const playerList = initPlayerList();

  playerList.push(player);
  localStorage.setItem('playerList', JSON.stringify(playerList));

  return player;
};

// Update the balance of a player
const updateBalance = (player, amount) => {
  const playerList = initPlayerList();
  const index = playerList.findIndex(p => p.name === player.name);

  playerList[index].balance += amount;
  localStorage.setItem('playerList', JSON.stringify(playerList));
};

// Update an existing player in the list
const updatePlayer = (player) => {
  const playerList = initPlayerList();
  const index = playerList.findIndex(p => p.name === player.name);

  playerList[index] = player;
  localStorage.setItem('playerList', JSON.stringify(playerList));
};

// Get the human player (if any)
const getHumanPlayer = () => {
  const playerList = initPlayerList();
  return playerList.find(p => !p.isAI);
};

// Check if there is at least one human player
const hasHumanPlayer = () => {
  const playerList = initPlayerList();
  return playerList.some(p => !p.isAI);
};

// Get all non-human players
const getAIPlayers = () => {
  const playerList = initPlayerList();
  return playerList.filter(p => p.isAI);
};

const player = {
  initPlayerList,
  addPlayer,
  updateBalance,
  updatePlayer,
  getHumanPlayer,
  hasHumanPlayer,
  getAIPlayers,
  getPlayerList
};

export default player;

