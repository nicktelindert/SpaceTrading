const names = [
    'Mars Trading inc.',
    'MoMoney Inc.',
    'A.C.M.E',
    'DollarSigns Inc.'
]


const createNewPlayer = (ship, playerName) => {
  if (ship) {
    let ai = true
    let name;
    if (playerName) {
      name = playerName	
    } else {
      ai = false
      name = names.pop()
    }
    
    return {
        name: name,
	balance: 50000 - ship.price,
	ship: ship
    }
  }
}



export { createNewPlayer }
