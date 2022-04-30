import {purchaseShip} from '../models/ship.js'

test ('purchaseShip should be defined', () => {
    const ship = purchaseShip('SteamRocket V1')
    expect(ship).toBeDefined()
}) 

test ('purchaseShould should return a random ship when no parameters are entered', () => {
    const ship = purchaseShip()
    expect(ship).toBeDefined()
})

test ('purchaseShip should return the correct ship', () => {
    const ship = purchaseShip('SteamRocket V1')
    expect(ship.name).toEqual('SteamRocket V1')
}) 
