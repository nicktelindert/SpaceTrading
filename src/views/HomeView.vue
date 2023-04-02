<script setup>
import player from '@/models/player.js';
import {usePlayerInfoStore} from '@/stores/playerInfo.js';

let me = player.getHumanPlayer()
if (me) {
    usePlayerInfoStore().setPlayerBalance(me.balance)
    usePlayerInfoStore().setPlayerName(me.name)
}
</script>

<template>
<div class="menu">
    <router-link class="buttonBig" to='/new-game'>Start Game</router-link>
</div>
</template>
<style>
   .menu {
       display:grid;
       justify-content: center;
   }
 
</style>


