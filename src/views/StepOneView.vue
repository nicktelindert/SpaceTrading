<script setup>
 import {getShipList, purchaseShip} from '@/composables/models/ship.js';
 import {usePlayerInfoStore} from '@/stores/playerInfo.js';
 import {createNewGame} from '@/composables/models/game.js';
import router from "@/router";

 const shipList = getShipList()
 let shipName = ''
 let playerName = ''

 const selectShip = name => {
    shipName = name
 }

 const setPlayerName = (player) => {
    playerName  = player.target.value
 }

 const saveOptions = () => {
    usePlayerInfoStore().setPlayerShip(purchaseShip(shipName))
    usePlayerInfoStore().setPlayerName(playerName)
    createNewGame(usePlayerInfoStore().playerName, usePlayerInfoStore().playerShip)
    router.push('/step-2')
 }
</script>

<template>
<input @blur="setPlayerName($event)" placeholder="player name..."/>
<ul v-for="ship in shipList" :key="ship.name">
    <li><a href="#" @click="selectShip(ship.name)"> {{ ship.name }}: ${{ ship.price }},-</a></li>
</ul>
<a href="#" class="button" @click="saveOptions()">Buy ship</a>
</template>
