<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
    variant?: 'menu' | 'action' | 'advance';
    iconOnly?: boolean;
    ariaLabel: string;
  }>(),
  {
    disabled: false,
  },
);
</script>

<template>
  <button
    :disabled="disabled"
    :class="['base-button', variant, { iconOnly: iconOnly }]"
    :aria-label="ariaLabel"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
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

.base-button.iconOnly {
  width: 40px;
  padding: 0;

  @media (min-width: 769px) {
    width: 50px;
  }
}

.base-button :slotted(svg) {
  width: 25px;
  height: 25px;
}

.action {
  color: rgb(238, 232, 232);
  background-color: var(--grass-green);
  width: 100px;
  padding: 0;
  max-width: 100%;

  @media (min-width: 769px) {
    width: 200px;
  }
}

.advance {
  color: black;
  background-color: var(--sun-yellow);
}

.menu {
  color: rgb(211, 205, 205);
  background-color: var(--earth-brown);
}
</style>
