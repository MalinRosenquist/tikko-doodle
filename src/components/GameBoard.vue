<script setup lang="ts">
import GameHeader from './GameHeader.vue';
import GameScene from './GameScene.vue';
import GameFooter from './GameFooter.vue';
</script>

<template>
  <div class="game-board">
    <GameHeader />
    <GameScene />
    <GameFooter />
  </div>
</template>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  width: 100%;
  height: 100svh;
  min-width: 320px;
  min-height: 600px;
  background-color: red;
}

@media (min-width: 769px) {
  .game-board {
    width: 620px;
    height: 850px;
    max-height: 90svh;
    border-radius: 16px;
    overflow: hidden;
    border: 4px solid lightblue;
  }
}
</style>
