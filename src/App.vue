<script setup>
import { computed } from "vue";
import { usePlayerInfoStore } from "@/stores/playerInfo.js";
import player from '@/composables/models/player.js';
import game from '@/composables/models/game.js'
import { useRouter } from 'vue-router';
import router from '@/router'

const currentRoute = computed(() => {
      return useRouter().currentRoute.value.path;
})

const playerName = computed(() => {
    return usePlayerInfoStore().playerName
});

const playerBalance = computed(() => {
    return usePlayerInfoStore().playerBalance
});

const nextStep = () => {
  game.endRound()
  router.push('/next-round')
}
</script>

<template>
  <header>
    <div class="container">
      <div class="header">
       <h1>SpaceTrading</h1>
      </div>
      <div class="playerInfo block">
        <span v-if="playerBalance > 0" class="balance">Balance: {{ playerBalance }}</span>
        <span v-else class="balance">Balance: 0</span> 
        <span v-if="playerName" class="playerName">Player: {{ playerName }}</span>
        <span v-else class="playerName">Player: Unknown</span>
        <a v-if="currentRoute === '/market'" href="#" @click="nextStep()">Next Round</a>
        <a v-else href="#" class="disabled">Next Round</a>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </header>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap");
body {
  color: #e0e2e4;
  background-color: #484f4f;
}

.block {
  background-color: #8ca3a3;
  border-radius: 10px;
}

.playerInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  padding: 16px 32px 16px 32px;
}

.playerInfo a {
    color: #e0e2e4;
    font-weight: bold;
} 
a,
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #e0e2e4;
}

.container {
  display: grid;
  justify-items: stretch;
  margin: 32px;
}

.content {
  border-radius: 10px;
  display: grid;
  margin: 32px;
  background-color: #e0e2e4;
  color: #484f4f;
  padding: 32px;
}

ul {
  padding: 16px;
  list-style: none;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.content p,
a,
li,
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #484f4f;
}

.header > h1 {
  font-family: "Space Mono", monospace;
  color: #e0e2e4;
}

a.buttonBig {
  font-family: "Space Mono", monospace;
  font-size: 64px;
}

a.button {
  padding: 8px;
  margin: 16px;
  background-color: #8ca3a3;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 18rem;
  height: 3rem;
  color: #e0e2e4;
  text-decoration: none;
  font-size: 16pt;
}

.table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tableHeader {
  font-weight: bolder;
  border-bottom: 1px #000 solid;
  margin-bottom: 16px;
}

.row {
  display: grid;
  grid-template-columns: repeat(4, 2fr);
}

.listImage {
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
}

input {
  height: 32px;
  padding: 16px;
}

a.active {
  opacity: 0.4;
}

a.disabled {
 opacity: 0.3;
}

a.button:hover {
    background-color: #484f4f;
}

</style>
