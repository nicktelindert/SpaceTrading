import {defineStore} from 'pinia';

export const usePlayerInfoStore = defineStore({
  id: 'playerInfo',
  state: () => ({
    name: '',
    ship: {},
    balance: null,
  }),
  getters: {
    playerName: (state) => state.name,
    playerShip: (state) => state.ship,
    playerBalance: (state) => state.balance,
  },
  actions: {
    setPlayerName(name) {
      this.name = name;
    },
    setPlayerShip(ship) {
      this.ship = ship;
    },
    setPlayerBalance(balance) {
      this.balance = balance;
    },
  },
});
