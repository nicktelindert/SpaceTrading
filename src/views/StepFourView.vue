<script setup>
 import {getHumanPlayer} from '@/composables/models/player.js';
 import {getPlanetList, getCurrentPlanet, getMarketValue} from '@/composables/models/planet.js';
</script>

<template>
    <h1>Welcome to {{ getCurrentPlanet().name }}</h1>
    <p>Your Balance: $ {{ getHumanPlayer().balance }}</p>
    <h2>Options</h2>
    <router-link to='/buy'>Buy</router-link>
    <router-link to='/sell'>Sell</router-link>
</template>


