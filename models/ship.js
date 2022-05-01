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
      newShip.usedCapacity = 0;
      newShip.getCapacity = function() {
        return this.totalCapacity - this.usedCapacity;
      };
      newShip.updateCapacity = function() {
        this.usedCapacity = 0;
        this.cargo.forEach((item) => {
          this.usedCapacity= this.usedCapacity + parseInt(item.quantity);
        });
      };
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
      return ship[0];
    }
  } else {
    return ships[generateMinMaxNumber(0, ships.length)];
  }
};

const getProductFromCargo = (player, name) => {
  if (player.ship.cargo.length>0) {
    return player.ship.cargo.filter((val) => val.name === name)[0];
  }
};

const addProductToCargo = (player, quantity, price, name) => {
  player.ship.cargo.push({
    quantity: quantity,
    name: name,
    price: price,
  });
  player.ship.updateCapacity();
};

const removeProductFromCargo = (player, name) => {
  player.ship.cargo = player.ship.cargo.filter((val) => val.name !== name);
  player.ship.updateCapacity();
};

const updateProductQuantityInCargo = (player, name, quantity) => {
  const idx = player.ship.cargo.findIndex((obj) => obj.name === name);
  player.ship.cargo[idx].quantity = quantity;
  player.ship.updateCapacity();
};

export {purchaseShip, getShipList, getProductFromCargo, addProductToCargo, removeProductFromCargo, updateProductQuantityInCargo};
