<script setup>
import router from "@/router";
import { startRound } from "@/composables/models/game.js";
import {
  getPlanetList,
  getCurrentPlanet,
  getMarketValue,
} from "@/composables/models/planet.js";
import { getPlayerList, getHumanPlayer } from "@/composables/models/player.js";
const players = getPlayerList();
const me = getHumanPlayer();
const planets = getPlanetList();
const selectPlanet = (planetName) => {
  startRound(planetName);
  router.push("/welcome-to-planet");
};
</script>

<template>
  <h1>Planets</h1>
  <ul v-for="planet in planets" :key="planet.name">
    <li>
      <a class="listImage" href="#" @click="selectPlanet(planet.name)"
        ><img
          width="128"
          height="128"
          :src="'images/planets/' + planet.name + '.png'"
        /><span>{{ planet.name }}</span></a
      >
    </li>
  </ul>
</template>
