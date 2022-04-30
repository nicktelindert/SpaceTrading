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
        ai = false
        name = playerName	
    } else {
      name = names.pop()
    }
    
    return {
        name: name,
	ai: ai,
	balance: 50000 - ship.price,
	ship: ship,
	updateBalance: function (subtract) { this.balance = this.balance - subtract }
    }
  }
}



export { createNewPlayer }
