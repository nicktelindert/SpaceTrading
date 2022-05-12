import {defineStore} from 'pinia';

export const usePlayerInfoStore = defineStore({
  id: 'playerInfo',
  state: () => ({
    name: '',
    balance: null,
  }),
  getters: {
    playerName: (state) => state.name,
    playerBalance: (state) => state.balance,
  },
  actions: {
    setPlayerName(name) {
      this.name = name;
    },
    setPlayerBalance(balance) {
      this.balance = balance;
    },
  },
});
