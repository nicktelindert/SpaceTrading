<script setup>
import { ref } from "vue";
import ship from "@/composables/models/ship.js";
import { usePlayerInfoStore } from "@/stores/playerInfo.js";
import game from "@/composables/models/game.js";
import router from "@/router";

const shipList = ship.getShipList();
let shipName = ref("");
let playerName = "";

const selectShip = (name) => {
  shipName.value = name;
};

const setPlayerName = (player) => {
  playerName = player.target.value;
};

const saveOptions = () => {
  usePlayerInfoStore().setPlayerShip(ship.purchaseShip(shipName.value));
  usePlayerInfoStore().setPlayerName(playerName);
  game.createNewGame(
    usePlayerInfoStore().playerName,
    usePlayerInfoStore().playerShip
  );
  router.push("/player-overview");
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
      <li v-if="ship.name === shipName" class="listImage">
        <a class="listImage active" href="#" @click.prevent="selectShip(ship.name)"
          ><img width="128" :src="'images/ships/' + ship.name + '.png'" />
          <span>{{ ship.name }}</span>
        </a>
        <span class="price">$ {{ ship.price }}</span>
      </li>
      <li v-else class="listImage">
        <a class="listImage" href="#" @click.prevent="selectShip(ship.name)"
          ><img width="128" :src="'images/ships/' + ship.name + '.png'" />
          <span>{{ ship.name }}</span>
        </a>
        <span class="price">$ {{ ship.price }}</span>
      </li>
    </template>
  </ul>
  <a href="#" class="button" @click="saveOptions()">Buy ship</a>
</template>

<style>
.price {
    font-style: italic;
    font-weight: bold;
}
</style>
