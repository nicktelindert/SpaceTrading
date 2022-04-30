import { generateProductList, getMarketValues, getMarketValuePrice, getMarketValue } from './product.js'
import { generatePlanet } from './planet.js'
import { purchaseShip } from './ship.js'
import {createNewPlayer} from './player.js'

const planetList = []
let players = []
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
            player.updateBalance(-totalPrice)
	    selectedProduct[0].updateQuantity(amount)
	    player.ship.cargo.push({
	        quantity: parseInt(amount), 
		price: totalPrice,
		name: selectedProduct[0].name
	    })
	    player.ship.updateCapacity(-amount)
	} else {
            console.log('You dont have enough money...')
	}
    }
}

const sellProduct  = (name, amount, player) => {
    const selectedProduct = player.ship.cargo.filter(val => val.name === name)
    const planetProduct = currentPlanet.market.filter(val => val.name === name)
    if (selectedProduct.length === 1 && amount <= selectedProduct[0].quantity && planetProduct.length === 1) {
	 const totalPrice = amount * planetProduct[0].price
	 player.updateBalance(totalPrice)
	 player.ship.cargo = player.ship.cargo.filter(val => val.name !== name)
	 if (amount < selectedProduct.quantity) {
	     const product = selectedProduct[0]
	     product.quantity = parseInt(product.quantity - amount)
	     player.ship.cargo = player.ship.cargo.filter(val => val.name !== name)
	     player.ship.cargo.push(product)
	 }
         player.ship.updateCapacity(parseInt(amount))
       
    } else {
        console.error('You dont have enough of this product in your cargo')
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
	    return false
	}
    }

    round++
    return round
}

const letAiPlay = () => {
    const nonHumanPlayers = players.filter( val => val.ai === true)
    nonHumanPlayers.forEach((nonHumanPlayer) => {
	currentPlanet = planetList[Math.floor(Math.random() * planetList.length)]
	if (nonHumanPlayer.ship.cargo.length >0) {
            nonHumanPlayer.ship.cargo.forEach((product) => {
                sellProduct(product.name, product.amount, nonHumanPlayer)
	    })
	} else {
	    for (let t=0; t< 4; t++) {
	        buyProduct(currentPlanet.market[Math.floor(Math.random() * currentPlanet.market.length)], (nonHumanPlayer.ship.capacity / 4), nonHumanPlayer)
	    }
	}
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

export { createNewGame, planetList, players, game, round, startGame, letAiPlay, checkForWinners, startRound, endRound, currentPlanet, getHumanPlayer, buyProduct, sellProduct }
