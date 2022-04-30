import { getHumanPlayer, buyProduct, createNewGame, planetList, players, round, startGame, endRound, startRound, currentPlanet } from '../models/game.js'
import { purchaseShip, generateShipList } from '../models/ship.js'

const planetName = 'Xena'
const productName = 'Purple Bananas'

createNewGame('Player One', purchaseShip('SteamRocket V1'))

test ('Game should have 6 planets', () => {
    expect(planetList).toHaveLength(6)
})

test ('Game round should be equal to 1', () => {
    startGame(true)
    expect(round).toEqual(1)
})

test ('startRound should set the currentPlanet based on input', () => {
    startRound('Xena')	
    expect(currentPlanet.name).toEqual('Xena')	
})

test ('getHumanPlayer should return a human player',() => {
    const humanPlayer = getHumanPlayer()
    expect(humanPlayer.ai).toBeFalsy()	
})

test ('Buy a product', () => {
    buyProduct(productName, 12, getHumanPlayer())
    console.table([getHumanPlayer()])
}) 

test ('Expect game to have 4 players', () => {
    console.table(players)
    expect(players).toHaveLength(4)
})
