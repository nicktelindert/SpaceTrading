import { getPlayerList, getHumanPlayer, createNewPlayer, checkForWinners, getNonHumanPlayers } from '../models/player.js'
import { purchaseShip } from '../models/ship.js'

const playerList = getPlayerList()


test ('getPlayerList should generate 4 players', () => {
    expect(playerList).toHaveLength(4)
})

test ('createNewPlayer should create a human player', () => {
    createNewPlayer(purchaseShip(), 'Henk')
    const res = getHumanPlayer()
    expect(res.ai).toBeFalsy()
})

test ('checkForWinners should return false', () => {
    const res = checkForWinners(2000000)
    expect(res).toBeFalsy()
})


test ('getNonHumanPlayers should return 4 players', () => {
    expect(getNonHumanPlayers()).toHaveLength(4)
})
