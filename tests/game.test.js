import { buyProduct, sellProduct, createNewGame, round, startGame, endRound, startRound, letAiPlay } from '../models/game.js'
import { purchaseShip } from '../models/ship.js'
import { getPlayerList, getHumanPlayer, createNewPlayer } from '../models/player.js'
const planetName = 'Xena'
const productName = 'Purple Bananas'

createNewGame('Player One', purchaseShip('SteamRocket V1'))
getPlayerList()

test ('Game round should be equal to 1', () => {
    startGame(true)
    expect(round).toEqual(1)
})


test ('Buy a product', () => {
    startRound('Xena')
    expect(buyProduct(productName, 13, getHumanPlayer())).toBeTruthy()
}) 

test ('Buy a product should now return false', () => {
    startRound('Xena')
    expect(buyProduct(productName, 10000000, getHumanPlayer())).toBeFalsy()
    
}) 

test ('Sell product should return false', () => {
    startRound('Xena')
    expect( sellProduct(productName,19,getHumanPlayer())).toBeFalsy()
})

test ('Sell product should return false because there is no room left', () => {
    startRound('Xena')
    expect( sellProduct(productName,getHumanPlayer().ship.capacity+1,getHumanPlayer())).toBeFalsy()
})

test ('Sell product should return true', () => {
    startRound('Xena')
    expect( sellProduct(productName,12,getHumanPlayer())).toBeTruthy()
})

test ('endRound should return false', () => {
    for (let t=0; t<11;t++) {
        startRound('Xena')
	endRound()
    }
    expect(endRound()).toEqual(false)
})

test ('letAiPlay should return true', () => {
    expect(letAiPlay()).toBeTruthy()
})
