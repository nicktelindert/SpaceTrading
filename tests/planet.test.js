import { getPlanetList, setCurrentPlanet, getCurrentPlanet } from '../models/planet.js'
import { generateProductList } from '../models/product.js'

const planets = getPlanetList()

test ( 'getPlanetList should return a list with 6 planets', () => {
    expect(planets).toHaveLength(6)
});

test ('setCurrentPlanet should save currentPlanet', () => {
    setCurrentPlanet('Xena')
    const result = getCurrentPlanet()
    expect(result.name).toEqual('Xena')
})
