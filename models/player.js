import { purchaseShip } from './ship.js'

const names = [
    'Mars Trading inc.',
    'MoMoney Inc.',
    'A.C.M.E',
    'DollarSigns Inc.'
]

let list = []

const createNewPlayer = (ship, playerName) => {
  if (ship) {
    let ai = true
    let name;
    if (playerName) {
        ai = false
        name = playerName	
    } else {
      name = names.pop()
    }
    
    list.push({
        name: name,
	ai: ai,
	balance: 50000 - ship.price,
	ship: ship,
	updateBalance: function (sum) { this.balance = parseInt(this.balance) + parseInt(sum) }
    })
  }
}


const getPlayerList = () => {
    if (list.length <=1) {
        for (let t=0; t < 4; t++) {
            const player = createNewPlayer(purchaseShip())
        }
    }
    
    return list
}

const checkForWinners = (currentGoal) => {
    const players = list.filter(player => player.balance >= currentGoal)
    
    if (players.length === 1) {
        // We actually have a winner
	return true
    }

    return false
}

const getHumanPlayer = () => {
    const filter = list.filter( val => val.ai === false)
    if (filter.length === 1) {
        return filter[0]
    }
}

const getNonHumanPlayers = () => {
    return list.filter( val => val.ai === true)
}

const isThereAHumanPlayer = () => {
    // check if human player is still in the race
    return list.filter( val => val.ai === false).length >0
}

export { getPlayerList, createNewPlayer, getHumanPlayer, isThereAHumanPlayer, checkForWinners, getNonHumanPlayers }
