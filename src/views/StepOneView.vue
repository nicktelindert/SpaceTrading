<script setup>
import { ref } from "vue";
import { getShipList, purchaseShip } from "@/composables/models/ship.js";
import { usePlayerInfoStore } from "@/stores/playerInfo.js";
import { createNewGame } from "@/composables/models/game.js";
import router from "@/router";

const shipList = getShipList();
let shipName = ref("");
let playerName = "";

const selectShip = (name) => {
  shipName.value = name;
};

const setPlayerName = (player) => {
  playerName = player.target.value;
};

const saveOptions = () => {
  usePlayerInfoStore().setPlayerShip(purchaseShip(shipName.value));
  usePlayerInfoStore().setPlayerName(playerName);
  createNewGame(
    usePlayerInfoStore().playerName,
    usePlayerInfoStore().playerShip
  );
  router.push("/step-2");
};
</script>

<template>
  <input
    type="text"
    @blur="setPlayerName($event)"
    placeholder="player name..."
  />
  <ul>
    <template v-for="ship in shipList" :key="ship.name">
      <li v-if="ship.name === shipName">
        <a class="listImage active" href="#" @click="selectShip(ship.name)"
          ><img width="128" :src="'images/ships/' + ship.name + '.png'" />
          <span>{{ ship.name }} ($ {{ ship.price }})</span>
        </a>
      </li>
      <li v-else>
        <a class="listImage" href="#" @click="selectShip(ship.name)"
          ><img width="128" :src="'images/ships/' + ship.name + '.png'" />
          <span>{{ ship.name }} ($ {{ ship.price }})</span>
        </a>
      </li>
    </template>
  </ul>
  <a href="#" class="button" @click="saveOptions()">Buy ship</a>
</template>