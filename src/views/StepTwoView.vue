<script setup>
 import {getPlayerList, getHumanPlayer} from '@/composables/models/player.js';
 import {usePlayerInfoStore} from '@/stores/playerInfo.js';

 const players = getPlayerList()
 const me = getHumanPlayer()
 usePlayerInfoStore().setPlayerBalance(me.balance)
</script>

<template>
    <h1>Players</h1>
    <ul v-for="player in players" :key="player.name">
        <li v-if="player.ai">{{ player.name }}(AI)</li>
        <li v-else>{{ player.name }}(Me)</li>
    </ul>
    <router-link class="button" to='/step-3'>Lets travel</router-link>
</template>


