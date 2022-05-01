import { generateProductList, getMarketValues, getMarketValuePrice, getMarketValue } from './product.js'
import { getPlanetList, getCurrentPlanet, setCurrentPlanet } from './planet.js'
import { purchaseShip } from './ship.js'
import { getPlayerList, createNewPlayer, checkForWinners, isThereAHumanPlayer, getNonHumanPlayers } from './player.js'
import { generateMinMaxNumber } from '../utils/numbers.js'

const financialGoal = 100000
let game = 0
let round = 0

const createNewGame = (playerName, ship) => {
   if (playerName && ship) {
       createNewPlayer(ship, playerName)
   }
    
   round = 1
}

const startGame = (newGame = true) => {
    if (newGame) {
	game = 1
    }

    game++
}

const startRound = (planetName) => 
{   getPlanetList(true)
    setCurrentPlanet(planetName)
}

const buyProduct = (name, amount, player) => {
    const selectedProduct = getCurrentPlanet().market.filter(val => val.name === name)
    if (amount > player.ship.getCapacity()) {
        console.log('You dont have enough room')
        return false
    }
    if (selectedProduct.length === 1) {
	const totalPrice = amount * selectedProduct[0].price
	if (totalPrice < player.balance) {
            player.updateBalance(-totalPrice)
	    selectedProduct[0].updateQuantity(-amount)
	    player.ship.cargo.push({
	        quantity: parseInt(amount), 
		price: totalPrice,
		name: selectedProduct[0].name
	    })
	    player.ship.updateCapacity()
            return true
	} else {
            console.log('You dont have enough money...')
	    return false
	}
    }
}

const sellProduct  = (name, amount, player) => {
    const selectedProduct = player.ship.cargo.filter(val => val.name === name)
    const planetProduct = getCurrentPlanet().market.filter(val => val.name === name)
    if (selectedProduct.length === 1 && amount <= selectedProduct[0].quantity && planetProduct.length === 1) {
	 const totalPrice = amount * planetProduct[0].price
	 player.updateBalance(totalPrice)
	 player.ship.cargo = player.ship.cargo.filter(val => val.name !== name)
	 if (amount < selectedProduct[0].quantity) {
	     const product = selectedProduct[0]
	     product.quantity = parseInt(product.quantity - amount)
	     player.ship.cargo = player.ship.cargo.filter(val => val.name !== name)
	     player.ship.cargo.push(product)
	 }
	 getCurrentPlanet().market = getCurrentPlanet().market.filter(val => val.name !== name)
	 planetProduct[0].updateQuantity(parseInt(amount))
	 getCurrentPlanet().market.push(planetProduct[0])
         player.ship.updateCapacity()

	 return true
       
    } else {
        console.log('You dont have enough of this product in your cargo')
        return false
    }
}

const endRound = () => {
    // 1. Let AI players make some decisions
    letAiPlay() 
    if (round === 12) {
	const goal = financialGoal * game
        if (checkForWinners(goal)) {
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
    let planetList = getPlanetList()
    const nonHumanPlayers = getNonHumanPlayers()
    nonHumanPlayers.forEach((nonHumanPlayer) => {
	const currentPlanet = planetList[generateMinMaxNumber(0,(planetList.length-1))]
	if (nonHumanPlayer.ship.cargo.length >0) {
            nonHumanPlayer.ship.cargo.forEach((product) => {
                sellProduct(product.name, product.quantity, nonHumanPlayer)
	    })
	} else {
	    buyProduct(currentPlanet.market[generateMinMaxNumber(0, currentPlanet.market.length-1)].name, (nonHumanPlayer.ship.getCapacity()/4), nonHumanPlayer)
	}
    })

    return true
}

export { createNewGame, game, round, startGame, letAiPlay, startRound, endRound, buyProduct, sellProduct }
