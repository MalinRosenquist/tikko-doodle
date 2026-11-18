<script setup lang="ts">
import { useGameStore } from '@/game/game';

const store = useGameStore();
</script>

<template>
  <header class="game-header">Coins: {{ store.currentCoins }}</header>
</template>

<style scoped>
.game-header {
  background-color: yellow;
  padding: 10px;
  text-align: center;
}
</style>
