<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
    variant?: 'menu' | 'action' | 'advance';
  }>(),
  {
    disabled: false,
  },
);
</script>

<template>
  <button :disabled="disabled" :class="['base-button', variant]"><slot /></button>
</template>

<style scoped>
.base-button {
  height: 40px;
  padding: 10px;
  border-radius: 8px;
  box-shadow:
    inset 0 1px 0 #edeebf59,
    inset 0 -2px 0 #0003,
    0 1px 2px #0006;

  @media (min-width: 769px) {
    height: 50px;
  }
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(100%);
  box-shadow: none;
}

.action {
  color: rgb(238, 232, 232);
  background-color: var(--earth-brown);
}

.menu {
  color: rgb(168, 25, 25);
  background-color: var(--sun-yellow);
}
</style>
