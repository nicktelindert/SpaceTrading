<script setup>
 import {startRound} from '@/composables/models/game.js';
 import {getPlanetList, getCurrentPlanet, getMarketValue} from '@/composables/models/planet.js';
 import {getPlayerList, getHumanPlayer} from '@/composables/models/player.js';
 const players = getPlayerList()
 const me = getHumanPlayer()
 const planets = getPlanetList()
</script>

<template>
    <h1>Planets</h1>
    <ul v-for="planet in planets" :key="planet.name">
        <li><a href="#" @click="startRound(planet.name)">{{ planet.name }}</a></li>
    </ul>
    
    <router-link to='/step-4'>Buy Or Sell</router-link>
</template>


