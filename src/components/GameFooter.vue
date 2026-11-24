<script setup lang="ts">
import { useGameStore } from '@/game/game.ts';
import BaseButton from './ui/BaseButton.vue';
const store = useGameStore();
</script>

<template>
  <footer class="game-footer">
    <BaseButton>Ikon</BaseButton>
    <BaseButton variant="action">{{}}</BaseButton>
    <BaseButton>Ikon</BaseButton>
  </footer>
</template>

<style scoped>
.game-footer {
  background-color: var(--grass-green);
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: space-around;
}
</style>
