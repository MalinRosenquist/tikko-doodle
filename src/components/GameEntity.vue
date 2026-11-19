<script setup lang="ts">
import { useGameStore } from '@/game/game';
import { computed } from 'vue';

const store = useGameStore();

const entityImageSrc = computed(() => {
  return `/images/entities/${store.currentScene}-stage-${store.currentStage + 1}.png`;
});

const formattedAltText = computed(() => {
  return store.currentScene.charAt(0).toUpperCase() + store.currentScene.slice(1);
});
</script>

<template>
  <button data-testid="entity-button" class="game-entity" @click="store.earnCoins()">
    <img class="game-entity-image" :src="entityImageSrc" :alt="formattedAltText" />
  </button>
</template>

<style scoped>
.game-entity {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
}

.game-entity-image {
  width: 100px;
}
</style>
