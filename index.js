import * as readline from "readline";
import { createNewGame, players, planetList, getHumanPlayer, buyProduct,startRound, startGame, currentPlanet } from './models/game.js'
import { getMarketValuePrice } from './models/product.js'
import { ships, generateShipList } from './models/ship.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your company name? ', function (name) {
    const playerName = name
    generateShipList()
    console.table(ships)
    rl.question(`${playerName}, please choose which spaceship you want to buy?(Select by index) `, function (ship) {
	const choosenShip = ships[ship]
        console.log(`You bought ${choosenShip.name}`)
	createNewGame(playerName, choosenShip)
	console.log('Player Overview')
	console.table(players)
	startGame()
	chooseAPlanet()
    })
})

const chooseAPlanet = () => {
    console.log('Planet overview')
    console.table(planetList)
    rl.question('What planet would you like to visit first?(Select by index) ', function (planetIndex) {
        const choosenPlanet = planetList[planetIndex]
	startRound(choosenPlanet.name)
	chooseAProduct()	
    })
}

const chooseAProduct = () => {
    console.log(`products available on ${currentPlanet.name}`)
    console.table(currentPlanet.market)
    rl.question ('What product would you like to buy?(Select by index) ', function (productIndex) {
        const selectedProduct = currentPlanet.market[productIndex]
	const marketValue = getMarketValuePrice(selectedProduct.name)
	console.log(`Product ${selectedProduct.name} has a marketvalue of ${marketValue}`)
	rl.question ('Would you like to buy this product? Enter amount or press enter to cancel.', function(buy) {
            if (buy) {
                buyProduct(selectedProduct.name, buy, getHumanPlayer())
		console.log(getHumanPlayer())
		chooseAProduct()
	    } else {
		chooseAProduct()
	    }
	})
    })
}
