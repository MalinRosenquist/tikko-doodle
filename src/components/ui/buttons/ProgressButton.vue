<script lang="ts" setup>
import { useGameStore } from '@/game/game.ts';
import CoinIcon from '@/assets/icons/coin.svg';
import BaseButton from './BaseButton.vue';

const gameStore = useGameStore();
</script>

<template>
  <BaseButton
    variant="advance"
    :disabled="gameStore.currentCoins < gameStore.advanceCost"
    :ariaLabel="`Purchase advance for ${gameStore.advanceCost} coins`"
    @click="gameStore.purchaseAdvance"
    v-if="gameStore.isReadyToAdvance"
  >
    <CoinIcon /><span class="button-text"> {{ gameStore.advanceCost }}</span></BaseButton
  >
  <BaseButton
    variant="action"
    :disabled="gameStore.currentCoins < gameStore.subStepCost"
    :ariaLabel="`Purchase sub-step for ${gameStore.subStepCost} coins`"
    @click="gameStore.purchaseSubStep"
    v-else
  >
    <CoinIcon /><span class="button-text"> {{ gameStore.subStepCost }}</span></BaseButton
  >
</template>

<style scoped>
.button-text {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
}
</style>
