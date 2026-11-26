<script setup lang="ts">
import ArrowUpIcon from '@/assets/icons/arrow-up.svg';
import BaseButton from './ui/buttons/BaseButton.vue';
import ProgressButton from './ui/buttons/ProgressButton.vue';
</script>

<template>
  <footer class="game-footer">
    <BaseButton variant="menu" iconOnly :ariaLabel="'icon'">
      <ArrowUpIcon />
    </BaseButton>
    <ProgressButton />
    <BaseButton variant="menu" iconOnly :ariaLabel="'icon'">
      <ArrowUpIcon />
    </BaseButton>
  </footer>
</template>

<style scoped>
.game-footer {
  background-color: var(--dark-brown);
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: space-around;
}
</style>
