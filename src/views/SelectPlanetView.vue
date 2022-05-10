<script setup>
import router from "@/router";
import game from "@/composables/models/game.js";
import planet from "@/composables/models/planet.js";
import player from "@/composables/models/player.js";
const players = player.getPlayerList();
const me = player.getHumanPlayer();
const planets = planet.getPlanetList();
const selectPlanet = (planetName) => {
  game.startRound(planetName);
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
