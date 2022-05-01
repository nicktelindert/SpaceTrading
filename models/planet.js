import {generateProductList} from './product.js'

const names = [
    "Persephone",
    "Xena",
    "Gliese",
    "Kepler-22b",
    "Theseus",
    "Neoptolemus" 
]

let currentPlanet;
let planetList = []
const generatePlanet = (planetName) => {
   if (planetName) {
       return {
            name: planetName,
            market: generateProductList()
       }
   }

   return {}
}

const setCurrentPlanet = (planetName) => {
    if (planetList.length === 0) {
        getPlanetList()
    }
    const filter = planetList.filter(val => val.name === planetName)
    if (filter.length === 1) {
       currentPlanet = filter[0]
   }
}

const getCurrentPlanet = () => {
    return currentPlanet
}

const getPlanetList = (newMarket = false) => {
   if (newMarket === true || planetList.length === 0) {
       planetList = []
       for (let t=0; t< 6; t++) {
            planetList.push(generatePlanet(names[t]))

       } 
   }

   return planetList
}


export { getPlanetList, setCurrentPlanet, getCurrentPlanet }
