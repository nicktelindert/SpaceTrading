<script setup>
 import player from '@/composables/models/player.js';
 import {usePlayerInfoStore} from '@/stores/playerInfo.js';

 const players = player.getPlayerList()
 const me = player.getHumanPlayer()
 usePlayerInfoStore().setPlayerBalance(me.balance)
</script>

<template>
    <h1>Players</h1>
    <div class="table">
        <div class="row tableHeader">
            <span>Name</span>
            <span>Ship</span>
            <span>Balance</span>
        </div>
    </div>
    <div class="row" v-for="player in players" :key="player.balance">
        <span>{{ player.name }}</span>
        <span>{{ player.ship.name }}</span>
        <span>{{ player.balance }}</span>
    </div>
    <router-link class="button" to='/select-planet'>To infinity and beyond</router-link>
</template>


