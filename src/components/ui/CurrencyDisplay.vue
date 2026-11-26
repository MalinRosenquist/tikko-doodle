<script setup lang="ts">
import CoinIcon from '@/assets/icons/coin.svg';
import CloverIcon from '@/assets/icons/clover.svg';
import { useGameStore } from '@/game/game';

const store = useGameStore();

defineProps<{
  variant: 'coin' | 'clover';
}>();
</script>

<template>
  <div v-if="variant === 'coin'" class="currency-display">
    <div class="currency-icon" aria-hidden="true">
      <CoinIcon />
    </div>
    <span data-testid="coin-display" class="currency-value" aria-label="Current coins">
      {{ store.currentCoins }}
    </span>
  </div>

  <div v-else-if="variant === 'clover'" class="currency-display">
    <div class="currency-icon" aria-hidden="true">
      <CloverIcon />
    </div>
    <span data-testid="clover-display" class="currency-value" aria-label="Current clovers">
      {{ store.currentCoins }}
    </span>
  </div>
</template>

<style scoped>
.currency-display {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 40px;
  width: 130px;
  max-width: 100%;
  padding: 0.3rem;
  border-radius: 20px;
  background-color: var(--light-surface);
  box-shadow:
    inset 0 1px 0 #edeebf59,
    inset 0 -2px 0 rgba(65, 64, 64, 0.2),
    0 1px 2px rgba(94, 93, 93, 0.4);

  @media (min-width: 769px) {
    height: 40px;
  }
}

.currency-icon {
  position: absolute;
  left: -18px;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
}
</style>
