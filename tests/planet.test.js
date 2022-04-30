import { generatePlanet } from '../models/planet.js'
import { generateProductList } from '../models/product.js'

test ( 'getPlanet should return an object with a random name', () => {
   const planet = generatePlanet(generateProductList())
   expect(planet).toHaveProperty('name')
   expect(planet).toHaveProperty('market')
});
