import { generateProductList, getMarketValues, getMarketValuePrice, getMarketValue } from './product.js'
import { generatePlanet } from './planet.js'
import { purchaseShip } from './ship.js'
import {createNewPlayer} from './player.js'

const planetList = []
const players = []
const financialGoal = 1000000
let game = 0
let round = 0
let currentPlanet;

const createNewGame = (playerName, ship) => {
   for (let t=0; t< 6; t++) {
        planetList.push(generatePlanet(generateProductList()))
       
   }
   
   if (playerName && ship) {
       players.push(createNewPlayer(ship, playerName))
   }
   
   for (let t=0; t <3; t++) {
      const randomShip = purchaseShip()
      
      if (randomShip) {
          const newPlayer = createNewPlayer(randomShip)
          if (newPlayer) {
              players.push(newPlayer)
          }
      }
   }
}

const startGame = (newGame = true) => {
    round = 1
    if (newGame) {
	game = 1
    }

    game++
}

const startRound = (planetName) => {
   const filter = planetList.filter(val => val.name === planetName)
    if (filter.length === 1) {
       currentPlanet = filter[0]
   }
}

const buyProduct = (name, amount, player) => {
    const selectedProduct = currentPlanet.market.filter(val => val.name === name)
    
    if (selectedProduct.length === 1 && amount <= player.ship.capacity ) {
	const totalPrice = amount * selectedProduct[0].price
	    if (totalPrice < player.balance) {
                player.updateBalance(amount * selectedProduct[0].price)
	        selectedProduct[0].updateQuantity(amount)
		player.ship.updateCapacity(amount)
	    } else {
                console.log('You dont have enough money...')
	    }
    }
}


const endRound = () => {
    // 1. Let AI players make some decisions
    letAiPlay() 
    if (round === 12) {
        if (checkForWinners()) {
    	    if (!isThereAHumanPlayer()) {
		return false 
    	    }
	} else {
            startGame()
	}
    	return
    }

    round++
}

const letAiPlay = () => {
    const nonHumanPlayers = players.filter( val => val.ai === true)
    nonHumanPlayers.forEach((nonHumanPlayer) => {
	nonHumanPlayer.decide()
    })
}

const checkForWinners = () => {
    const currentGoal = game * financialGoal
    players = players.filter(player => player.balance >= currentGoal)
    
    
    if (players.length === 1) {
        // We actually have a winner
	return true
    }

    return false
}

const getHumanPlayer = () => {
    const filter = players.filter( val => val.ai === false)
    if (filter.length === 1) {
        return filter[0]
    }
}

const isThereAHumanPlayer = () => {
    // check if human player is still in the race
    return players.filter( val => val.ai === false).length >0
}

export { createNewGame, planetList, players, game, round, startGame, letAiPlay, checkForWinners, startRound, endRound, currentPlanet, getHumanPlayer, buyProduct }

