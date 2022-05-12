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
      newShip.price = generateMinMaxNumber(10000, 15000);
      newShip.totalCapacity = generateMinMaxNumber(100, 150);
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
    price: price,
  });

  updateCapacity(player.ship);
};

const removeProductFromCargo = (player, name) => {
  player.ship.cargo = player.ship.cargo.filter((val) => val.name !== name);
  updateCapacity(player.ship);
};

const updateCapacity = (ship) => {
  let usedCapacity = 0;
  ship.cargo.forEach((item) => {
    usedCapacity += parseInt(item.quantity);
  });

  ship.capacity = parseInt(ship.totalCapacity - usedCapacity);
};

const updateProductQuantityInCargo = (player, name, quantity) => {
  const idx = player.ship.cargo.findIndex((obj) => obj.name === name);
  player.ship.cargo[idx].quantity = quantity;
  updateCapacity(player.ship);
};

const ship = {purchaseShip, getShipList, getProductFromCargo, addProductToCargo, removeProductFromCargo, updateProductQuantityInCargo, updateCapacity};

export default ship;
