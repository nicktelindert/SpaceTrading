import { createNewGame, planetList, players } from '../models/game.js'
import { purchaseShip } from '../models/ship.js'

createNewGame('Player One', purchaseShip('SteamRocket V1'))

test ('Game should have 6 planets', () => {
    expect(planetList).toHaveLength(6)
})

test ('Expect game to have 4 players', () => {
    console.table(players)
    expect(players).toHaveLength(4)
})
