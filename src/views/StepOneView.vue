<script setup>
 import {getShipList, purchaseShip} from '@/composables/models/ship.js';
 import {usePlayerInfoStore} from '@/stores/playerInfo.js';
 import {createNewGame} from '@/composables/models/game.js';

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
    console.log(usePlayerInfoStore().playerName)
    console.log(usePlayerInfoStore().playerShip)
    createNewGame(usePlayerInfoStore().playerName, usePlayerInfoStore().playerShip)
 }
</script>

<template>
<input @blur="setPlayerName($event)" placeholder="player name..."/>
<ul v-for="ship in shipList" :key="ship.name">
    <li><a href="#" @click="selectShip(ship.name)"> {{ ship.name }}: ${{ ship.price }},-</a></li>
</ul>
<a href="#" @click="saveOptions()">Buy ship</a>
<router-link to='/step-2'>Next</router-link>
</template>
