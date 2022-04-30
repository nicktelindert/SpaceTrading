const ships = [
]

let names = [
    'SteamRocket V1',
    'ThoriumRocket V3',
    'SteamRocket V2'
]


const generateShipList = () => {
    names.forEach(shipName => {
        let newShip = {}
        newShip.name = shipName
        newShip.price = Math.floor(Math.random() * 15000)
        newShip.capacity = Math.floor(Math.random() * 150)
	newShip.updateCapacity = function (amount) {
            this.capacity = this.capacity - amount
	}
        ships.push(newShip)
    })
}

const purchaseShip = (name) => {
   if (ships.length ===0) {
       generateShipList()
   }
   if (name) {
        const ship = ships.filter((val => val.name === name))
	if (ship.length ===1) {
	    return ship[0]
	}
    } else {

    	return ships[Math.floor(Math.random() * ships.length)]
    }
}

export { purchaseShip, ships, generateShipList }
