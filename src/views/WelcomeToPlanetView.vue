<script setup>
 import player from '@/composables/models/player.js';
 import planet from '@/composables/models/planet.js';
 const imageFile = `images/planets/${planet.getCurrentPlanet().name}.png`
</script>

<template>
    <h1>Welcome to {{ planet.getCurrentPlanet().name }}</h1>
    <div class="planetImg">
        <img width="128" height="128" :src="imageFile"/>
    </div>
    <p>Your Balance: $ {{ player.getHumanPlayer().balance }}</p>
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