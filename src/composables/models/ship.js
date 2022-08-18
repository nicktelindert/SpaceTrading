import {generateMinMaxNumber} from '../utils/numbers.js';

const ships = [
];

const names = [
  'SteamRocket V1',
  'ThoriumRocket V3',
  'SteamRocket V2',
];


const getShipList = () => {
  if (ships.length === 0) {
    names.forEach((shipName) => {
      const newShip = {};
      newShip.name = shipName;
      newShip.cargo = [];
      newShip.price = parseInt(generateMinMaxNumber(7000, 10000));
      newShip.totalCapacity = parseInt(generateMinMaxNumber(100, 150));
      newShip.capacity = newShip.totalCapacity;
      newShip.usedCapacity = 0;
      ships.push(newShip);
    });
  }

  return ships;
};

const purchaseShip = (name) => {
  if (ships.length ===0) {
    getShipList();
  }
  if (name) {
    const ship = ships.filter(((val) => val.name === name));
    if (ship.length ===1) {
      return JSON.parse(JSON.stringify(ship[0]));
    }
  } else {
    const ship = ships[generateMinMaxNumber(0, (ships.length-1))];
    if (ship) {
      return JSON.parse(JSON.stringify(ship));
    }
  }
};

const getProductFromCargo = (player, name) => {
  if (player.ship.cargo.length>0) {
    return player.ship.cargo.filter((val) => val.name === name)[0];
  }
};

const addProductToCargo = (player, quantity, price, name) => {
  player.ship.cargo.push({
    quantity: parseInt(quantity),
    name: name,
    price: price	  
  });


  updateCapacity(player.ship);
};

const removeProductFromCargo = (player, idx) => {
   player.ship.cargo.splice(idx, 1)
  updateCapacity(player.ship);
};

const updateCapacity = (ship) => {
  let usedCapacity = 0;
  ship.cargo.forEach((item) => {
    usedCapacity += parseInt(item.quantity);
  });

  ship.capacity = parseInt(ship.totalCapacity - usedCapacity);
};

const updateProductQuantityInCargo = (player, idx, quantity) => {
  player.ship.cargo[idx].quantity = quantity;
  updateCapacity(player.ship);
};

const ship = {purchaseShip, getShipList, getProductFromCargo, addProductToCargo, removeProductFromCargo, updateProductQuantityInCargo, updateCapacity};

export default ship;
