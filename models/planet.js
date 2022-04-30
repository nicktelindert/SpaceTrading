import {generateProductList} from './product.js'

const names = [
    "Persephone",
    "Xena",
    "Gliese",
    "Kepler-22b",
    "Theseus",
    "Neoptolemus" 
]


const generatePlanet = (list) => {
   const planetName = names.pop()
   if (planetName) {
       return {
            name: planetName,
            market: list
       }
   }

   return {}
}



export { generatePlanet }
