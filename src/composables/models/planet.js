import product from './product.js';

const names = [
  'Persephone',
  'Xena',
  'Gliese',
  'Kepler-22b',
  'Theseus',
  'Neoptolemus',
];

let currentPlanet = localStorage.getItem('currentPlanet') ? JSON.parse(localStorage.getItem('currentPlanet')) : [];
let planetList = [];

const generatePlanet = (planetName) => {
  if (planetName) {
    return {
      name: planetName,
      market: product.generateProductList(),
    };
  }

};

const setCurrentPlanet = (planetName) => {
  if (planetList.length === 0) {
    getPlanetList();
  }
  const filter = planetList.filter((val) => val.name === planetName);
  if (filter.length === 1) {
    currentPlanet = filter[0];
    localStorage.setItem('currentPlanet', JSON.stringify(filter[0]));
  }
};

const getMarketProductByName = (name) => {
  const searchProduct = getCurrentPlanet().market.filter((val) => val.name === name);
  if (searchProduct[0]) {
    return searchProduct[0];
  }
};

const getCurrentPlanet = () => {
  return currentPlanet;
};

const getPlanetList = (newMarket = false) => {
  if (newMarket === true || planetList.length === 0) {
    planetList = [];
    for (let t=0; t< 6; t++) {
      planetList.push(generatePlanet(names[t]));
    }
  }

  return planetList;
};


const getMarketValue = (name) => {
  let value = 0;
  planetList.forEach((planet) => {
    const searchProduct = planet.market.filter((val) => val.name ===name);
    if (searchProduct[0]) {
      value+= searchProduct[0].price;
    }
  });

  return Math.round(value/planetList.length);
};

const planet = {
  getPlanetList, setCurrentPlanet, getCurrentPlanet, getMarketProductByName, getMarketValue,
};

export default planet;
