<script setup>
import { ref } from 'vue';
import {usePlayerInfoStore} from '@/stores/playerInfo.js';
import game from '@/composables/models/game.js';
import planet from '@/composables/models/planet.js';
import player from '@/composables/models/player.js';

let selectProductBuy = ref('')
let amount = ref()

let me = player.getHumanPlayer()
usePlayerInfoStore().setPlayerBalance(me.balance)
usePlayerInfoStore().setPlayerName(me.name)

const buyProductProxy = (selectProduct, amount, me) => {
    game.buyProduct(selectProduct, amount, me)
    document.location.reload()
}

const sellProductProxy = (selectProduct, amount, me) => {
    game.sellProduct(selectProduct, amount, me)
    document.location.reload()
}

</script>

<template>
    <h1>{{ planet.getCurrentPlanet().name}} Market</h1>
    <p>Free cargo space: {{ me.ship.capacity }} ton</p>
    <template v-if="selectProductBuy !== ''">
        <p> How much of {{selectProductBuy}} do you want to buy?</p>
        <input name="amount" v-model="amount" type="number"/>
        <a class="button" @click.prevent="buyProductProxy(selectProductBuy, amount, me)">Buy</a>
    </template>
    <h2>My cargo</h2>
        <div class="table">
        <div class="row cargo tableHeader">
            <span>Name</span>
            <span>Price</span>
            <span>Selling price</span>
            <span>Amount</span>
            <span>Action</span>
        </div>
        {{ me.cargo }}
        <div class="row cargo" v-for="product in me.ship.cargo" :key="product.name">
            <span>{{ product.name }}</span>
            <span>{{ product.price / product.quantity }}</span>
            <span>{{ planet.getCurrentPlanet().market.filter(val => val.name === product.name)[0].price }}</span>
            <span>{{ product.quantity }}</span>
            <span><a class="button" href="#" @click.prevent="sellProductProxy(product.name, product.quantity, me)">Sell</a></span>
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
      grid-template-columns: repeat(5, 2fr);
  }
  
</style>
