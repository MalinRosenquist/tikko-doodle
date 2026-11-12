import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SceneId } from '@/types/gameConfig.types';
import { config } from '@/game/gameConfig';
import { calculateSubStepCost } from './gameMath';

export const useGameStore = defineStore('game', () => {
  const playerName = ref('');
  const currentCoins = ref(0);
  const currentScene = ref<SceneId>('sunflower');
  const currentStage = ref(0);
  const purchasedSubSteps = ref(0);

  function earnCoins() {
    currentCoins.value += config.scenes[currentScene.value].clickReward;
  }

  function purchaseSubStep() {
    const stage = config.scenes[currentScene.value].stages[currentStage.value];
    const maxSubStepsForStage = config.requiredSubSteps[currentStage.value];

    // If the stage is undefined, return early
    if (!stage) {
      return;
    }

    // Check if the player has already purchased the maximum number of sub-steps for the current stage
    if (maxSubStepsForStage === undefined || purchasedSubSteps.value >= maxSubStepsForStage) {
      return;
    }

    const cost = calculateSubStepCost(
      stage.subStep.subStepCost,
      stage.subStep.growthFactor,
      purchasedSubSteps.value,
    );

    if (currentCoins.value >= cost) {
      currentCoins.value -= cost;
      purchasedSubSteps.value += 1;
    }
  }

  return {
    playerName,
    currentCoins,
    currentScene,
    currentStage,
    purchasedSubSteps,
    earnCoins,
    purchaseSubStep,
  };
});
