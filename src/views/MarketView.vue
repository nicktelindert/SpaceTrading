<script setup>
import { ref } from 'vue';
import {usePlayerInfoStore} from '@/stores/playerInfo.js';
import game from '@/composables/models/game.js';
import planet from '@/composables/models/planet.js';
import player from '@/composables/models/player.js';

let selectProductBuy = ref('')
let amount = ref()
let sellingAmount = []

usePlayerInfoStore().setPlayerBalance(player.getHumanPlayer().balance)
usePlayerInfoStore().setPlayerName(player.getHumanPlayer().name)

const buyProductProxy = (selectProduct, amount) => {
    game.buyProduct(selectProduct, amount, player.getHumanPlayer())
    document.location.reload()
}

const setSellAmount = (event) => {
    console.log(event.target.value)
    sellingAmount[event.target.id] = event.target.value
}

const sellProductProxy = (selectProduct, amount) => {
    console.log(selectProduct)
    game.sellProduct(selectProduct, amount, player.getHumanPlayer())
    document.location.reload()
}

</script>

<template>
    <h1>{{ planet.getCurrentPlanet().name}} Market</h1>
    <p>Free cargo space: {{ player.getHumanPlayer().ship.capacity }} ton</p>
    <template v-if="selectProductBuy !== ''">
        <p> How much of {{selectProductBuy}} do you want to buy?</p>
        <input name="amount" v-model="amount" type="number"/>
        <a class="button" @click.prevent="buyProductProxy(selectProductBuy, amount)">Buy</a>
    </template>
    <h2>My cargo</h2>
        <div class="table">
        <div class="row cargo tableHeader">
            <span>Name</span>
            <span>Price</span>
            <span>Selling price</span>
            <span>In cargo</span>
            <span>Amount</span>
            <span>Action</span>
        </div>
        {{ player.getHumanPlayer().cargo }}
        <div class="row cargo" v-for="product,idx in player.getHumanPlayer().ship.cargo" :key="product.name">
            <span>{{ product.name }}</span>
            <span>{{ product.price }}</span>
            <span>{{ planet.getCurrentPlanet().market.filter(val => val.name === product.name)[0].price }}</span>
            <span>{{ product.quantity }}</span>
            <div><input name="amount" :id="'amount-'+ idx" type="number" @input="setSellAmount"/> </div>
            <span><a class="button" href="#" @click.prevent="sellProductProxy(idx, sellingAmount['amount-'+idx])">Sell</a></span>
        </div>
    </div>
    <h2>Product on {{ planet.getCurrentPlanet().name }}</h2>
    <div class="table">
        <div class="row tableHeader">
            <span>Name</span>
            <span>Price</span>
            <span>Amount</span>
            <span>Action</span>
        </div>
        <div class="row" v-for="product in planet.getCurrentPlanet().market" :key="product.name">
            <span>{{ product.name }}</span>
            <span>{{ product.price }}</span>
            <span>{{ product.quantity }}</span>
            <span><a class="button" href="#" @click.prevent="selectProductBuy = product.name">Buy</a></span>
        </div>
    </div>
</template>
<style>
  .row.cargo {
      grid-template-columns: repeat(6, 2fr);
  }
	
  .row.cargo input[type=number] {
    width: 48px;
    height: 16px;
  }
  
</style>
