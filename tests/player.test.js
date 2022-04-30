import {createNewPlayer} from '../models/player.js'
import {purchaseShip } from '../models/ship.js'

const ship = purchaseShip('SteamRocket V1')
test ('createNewPlayer returns an object with a name and balance', () => {
    const player = createNewPlayer(ship)
    expect(player).toHaveProperty('name')
    expect(player).toHaveProperty('balance')
    expect(player).toHaveProperty('ship')
})

test ('a players name should be defined', () => {
    const player = createNewPlayer(ship)
    expect(player.name).toBeDefined()
})

test ('a new players balance should be 50000', () => {
    const player = createNewPlayer(ship)
    expect(player.balance).toEqual(50000 - ship.price)
})
