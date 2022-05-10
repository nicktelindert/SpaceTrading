<script setup>
 import player from '@/composables/models/player.js';
 import {usePlayerInfoStore} from '@/stores/playerInfo.js';

 const players = player.getPlayerList()
 const me = player.getHumanPlayer()
 usePlayerInfoStore().setPlayerBalance(me.balance)
</script>

<template>
    <h1>Players</h1>
    <ul v-for="player in players" :key="player.name">
        <li v-if="player.ai">{{ player.name }}(AI)</li>
        <li v-else>{{ player.name }}(Me)</li>
    </ul>
    <router-link class="button" to='/select-planet'>Lets travel</router-link>
</template>


