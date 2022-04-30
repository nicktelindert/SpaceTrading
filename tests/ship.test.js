import {purchaseShip, generateShipList, ships} from '../models/ship.js'
generateShipList()

test ('purchaseShip should be defined', () => {
    console.table(ships)
    const ship = purchaseShip('SteamRocket V1')
    expect(ship).toBeDefined()
}) 

test ('purchaseShould should return a random ship when no parameters are entered', () => {
    const ship = purchaseShip()
    expect(ship).toBeDefined()
})

test ('Ships should equal 3 after running generateShipList', () => {
    expect(ships).toHaveLength(3)
})

test ('updateCapacity should increase cargo bij 100', () => {
    const ship = purchaseShip()
    const expectedResult = ship.capacity + 100
    ship.updateCapacity(100)
    expect(ship.capacity).toEqual(expectedResult)
})
test ('purchaseShip should return the correct ship', () => {
    const ship = purchaseShip('SteamRocket V1')
    expect(ship.name).toEqual('SteamRocket V1')
}) 
