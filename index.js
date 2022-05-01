import * as readline from "readline";
import { createNewGame, buyProduct, sellProduct, startRound, endRound, startGame, round } from './models/game.js'
import { getMarketValuePrice } from './models/product.js'
import { getShipList } from './models/ship.js'
import { getPlanetList, getCurrentPlanet } from './models/planet.js'
import { getPlayerList, getHumanPlayer } from './models/player.js'

const planetList = getPlanetList()
const players = getPlayerList()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your company name? ', function (name) {
    const playerName = name
    console.table(getShipList())
    rl.question(`${playerName}, please choose which spaceship you want to buy?(Select by index) `, function (ship) {
	const choosenShip = getShipList()[ship]
        console.log(`You bought ${choosenShip.name}`)
	createNewGame(playerName, choosenShip)
	playerOverview()
	startGame()
	chooseAPlanet()
    })
})

const playerOverview = () => {
    console.log(`Player Overview round: ${round}`)
    console.table(players)
}

const chooseAPlanet = () => {
    console.clear()
    playerOverview()
    console.log('Planet overview')
    console.table(planetList)
    rl.question('What planet would you like to visit first?(Select by index) ', function (planetIndex) {
        const choosenPlanet = planetList[planetIndex]
	startRound(choosenPlanet.name)
	buyOrSell()	
    })
}

const gameOver = () => {
    console.clear()
    console.log('GAME OVER...')
}

const buyOrSell = () => {
    console.clear()
    rl.question('Would you like to [B]uy of [S]ell? Enter N for next round. ', function(option) {
        switch (option) {
            case 'B':
	        buyAProduct()
		break;
	    case 'S': 
	        sellAProduct()
	    break;
	    case 'N':
	        if(!endRound()) {
		    gameOver()
		    break;
		}
		chooseAPlanet()
	    break;
	    default: 
	        buyOrSell()
	    break;
	} 
    })
}

const buyAProduct = () => {
    console.clear()
    const currentPlanet = getCurrentPlanet()
    console.log(`products available on ${currentPlanet.name}`)
    console.log(`Free cargo space: ${getHumanPlayer().ship.capacity}`)
    console.log(`Balance: ${getHumanPlayer().balance}`)
    console.table(currentPlanet.market)
    rl.question ('What product would you like to buy?(Select by index) ', function (productIndex) {
        if (!currentPlanet.market[productIndex]) {
	    buyOrSell()
	    return
	}
	const selectedProduct = currentPlanet.market[productIndex]
	const marketValue = getMarketValuePrice(selectedProduct.name)
	console.log(`Product ${selectedProduct.name} has a marketvalue of ${marketValue}`)
	rl.question ('Would you like to buy this product? Enter amount or press enter to cancel.', function(buy) {
            if (buy) {
                buyProduct(selectedProduct.name, buy, getHumanPlayer())
		console.table([getHumanPlayer()])
		buyOrSell()
	    } else {
		buyOrSell()
	    }
	})
    })
}

const sellAProduct = () => {
    console.clear()
    const currentPlanet = getCurrentPlanet()
    console.log('products available in your cargo')
    const cargo = getHumanPlayer().ship.cargo
    console.table(cargo)
    rl.question('What product would you like to sell?(Select by index) ', function (productIndex) {
	if (!cargo[productIndex]) {
	   buyOrSell()
	   return
	}
        const cargoProduct = cargo[productIndex]
	const marketProduct  = currentPlanet.market.filter(val => val.name === cargoProduct.name)[0]
        console.log(`the price for ${cargoProduct.name} on ${currentPlanet.name} is ${marketProduct.price}`)
        console.log(`You paid ${cargoProduct.price/cargoProduct.quantity}`)
	rl.question ('Would you like to sell this product? Please enter the amount or press enter to cancel ', function(sell) { 
	    if (sell) {
                sellProduct (cargoProduct.name, sell, getHumanPlayer())
		console.table([getHumanPlayer()])
		buyOrSell()
	    } else {
               buyOrSell()
	    }
	})
      
    })
}
