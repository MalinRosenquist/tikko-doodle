<script setup lang="ts">
import CurrencyDisplay from './ui/CurrencyDisplay.vue';
</script>

<template>
  <header class="game-header">
    <CurrencyDisplay variant="coin" />
    <CurrencyDisplay variant="clover" />
  </header>
</template>

<style scoped>
.game-header {
  display: flex;
  justify-content: space-evenly;
  background: #9abeec;
  padding: 1.25rem;
}
</style>
