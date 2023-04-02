import player from './player.js';

// Check if there is a single player whose balance is greater than or equal to the specified goal
const hasWinner = (goal) => {
  const playerList = player.initPlayerList();
  const winners = playerList.filter(p => p.balance >= goal);
  return winners.length === 1;
};

const winner = { hasWinner };

export default winner;
