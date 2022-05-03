<script setup>
import {computed} from 'vue';
import {usePlayerInfoStore} from '@/stores/playerInfo';

const playerName = computed(() => {
  return usePlayerInfoStore().playerName 
})

const playerBalance = computed(() => {
  return usePlayerInfoStore().playerBalance
})
</script>

<template>
  <header>
    <div class="container">
      <div class="header">
        <h1>SpaceTrading</h1>
      </div>
        <div class="playerInfo block">
          <span v-if="playerName" class="playerName">Player: {{ playerName }}</span>
          <span class="balance">Balance: {{ playerBalance }}</span>
        </div>
        <div class="content">
          <router-view/>    
        </div>
    </div>
  </header>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap');
    body {
      color: #e0e2e4;
      background-color: #484f4f;
    }
    
    .block {
      background-color:#8ca3a3;
      border-radius: 10px;
    }

    .playerInfo {
      display: grid;
      height: 4rem;
      align-content: space-around;
      justify-items: center;
      grid-template-columns: 1fr 1fr 6fr;
    }
    
    a, h1, h2, h3, h4, h5, h6 {
      color: #e0e2e4;
    }
    
    .container {
        display: grid;
        justify-items: stretch;
        margin: 32px;

    }

    .content {
      border-radius: 10px;
      display: grid;
      margin: 32px;
      background-color: #e0e2e4;
      color: #484f4f;
      padding: 32px;
    }

    ul {
      list-style: none;
    }
   
   .content p,a,li, h1,h2,h3,h4,h5,h6 {
      color: #484f4f;
    } 
    
    .header > h1 {
      font-family: 'Space Mono', monospace;
      color: #e0e2e4;
    }

    a.buttonBig {
      font-family: 'Space Mono', monospace;
      font-size: 64px;
    }
    
    a.button {
      padding: 8px;
      margin: 16px;
      background-color:#8ca3a3;
      display: flex;
      border-radius: 10px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 10rem;
      height: 3rem;
      color: #e0e2e4;
    }
   
   .table {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .tableHeader {
        font-weight: bolder;
        border-bottom: 1px #000 solid;
        margin-bottom: 16px;
    }
    
    .row {
        display:grid;
        grid-template-columns: repeat(4, 2fr);
    }

</style>
