const ships = [
    {
        name: 'SteamRocket V1',
        price: 10000,
        capacity: 1000
    },
    {
        name: 'SteamRocket V2',
	price: 12000,
	capacity: 1500
    }
]


const purchaseShip = (name) => {
   if (name) {
        const ship = ships.filter((val => val.name === name))
	if (ship.length ===1) {
	    return ship[0]
	}
    } else {

    	return ships[Math.floor(Math.random() * ships.length)]
    }
}

export { purchaseShip, ships }
