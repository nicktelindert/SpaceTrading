<script setup>
 import {getHumanPlayer} from '@/composables/models/player.js';
 import {getPlanetList, getCurrentPlanet, getMarketValue} from '@/composables/models/planet.js';
</script>

<template>
    <h1>Welcome to {{ getCurrentPlanet().name }}</h1>
    <div class="planetImg">
        <img width="128" height="128" src="@/assets/planets-atmo/planet-1.png"/>
    </div>
    <p>Your Balance: $ {{ getHumanPlayer().balance }}</p>
    <h2>Options</h2>
    <router-link class="button" to='/market'>Visit market</router-link>
</template>
<style>
    .planetImg {
        margin: 16px;
        width: 128px;
        height: 128px;
    }
</style>