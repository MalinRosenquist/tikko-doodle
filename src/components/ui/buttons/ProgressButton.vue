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
    <CoinIcon /> {{ gameStore.advanceCost }}</BaseButton
  >
  <BaseButton
    variant="action"
    :disabled="gameStore.currentCoins < gameStore.subStepCost"
    :ariaLabel="`Purchase sub-step for ${gameStore.subStepCost} coins`"
    @click="gameStore.purchaseSubStep"
    v-else
  >
    <CoinIcon />{{ gameStore.subStepCost }}</BaseButton
  >
</template>
