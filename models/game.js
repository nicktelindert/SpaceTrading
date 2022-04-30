import { generateProductList, getMarketValues, getMarketValuePrice, getMarketValue } from './product.js'
import { generatePlanet } from './planet.js'
import { purchaseShip } from './ship.js'
import {createNewPlayer} from './player.js'

const planetList = []
const players = []

const createNewGame = (playerName, ship) => {
   for (let t=0; t< 6; t++) {
        planetList.push(generatePlanet(generateProductList()))
       
   }
   
   if (playerName && ship) {
       players.push(createNewPlayer(ship, playerName))
   }
   
   for (let t=0; t <3; t++) {
      const randomShip = purchaseShip()
      
      if (randomShip) {
          const newPlayer = createNewPlayer(randomShip)
          if (newPlayer) {
              players.push(newPlayer)
          }
      }
   }
    
    
}

export { createNewGame, planetList, players }
