<script setup lang="ts">
import GameBoard from './components/GameBoard.vue';
</script>

<template>
  <div class="app-wrapper">
    <GameBoard />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100svh;
  display: flex;
  background-color: #1a1a1a;
  overflow: auto;
}
</style>
