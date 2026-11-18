<script setup lang="ts">
import GameEntity from './GameEntity.vue';
</script>

<template>
  <main class="game-scene">
    <GameEntity />
  </main>
</template>

<style scoped>
.game-scene {
  position: relative;
  flex: 1;
  background-image: url('@/assets/images/backgrounds/scene-1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
