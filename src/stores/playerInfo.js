import { defineStore } from 'pinia'

export const usePlayerInfoStore = defineStore({
  id: 'playerInfo',
  state: () => ({
    name: '',
    ship: {}
  }),
  getters: {
    playerName: (state) => state.name,
    playerShip: (state) => state.ship
  },
  actions: {
    setPlayerName (name) {
        this.name = name
    },
    setPlayerShip (ship) {
        this.ship = ship
    }
  }
})
