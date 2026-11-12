import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SceneId } from '@/types/gameConfig.types';
import { config } from '@/game/gameConfig';
import { calculateSubStepCost, calculateAdvanceCost } from './gameMath';

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

  function purchaseAdvance() {
    const stage = config.scenes[currentScene.value].stages[currentStage.value];
    const scene = config.scenes[currentScene.value];
    const maxSubStepsForStage = config.requiredSubSteps[currentStage.value];

    // If the stage is undefined, return early
    if (!stage) {
      return;
    }

    // Check if the player has purchased the maximum number of sub-steps for the current stage
    if (maxSubStepsForStage === undefined || purchasedSubSteps.value !== maxSubStepsForStage) {
      return;
    }

    const lastSubStepCost = calculateSubStepCost(
      stage.subStep.subStepCost,
      stage.subStep.growthFactor,
      purchasedSubSteps.value - 1,
    );

    const advanceCost = calculateAdvanceCost(lastSubStepCost, scene.advanceMultiplier);
    
    if (currentCoins.value >= advanceCost) {
      currentCoins.value -= advanceCost;
      purchasedSubSteps.value = 0;
      currentStage.value +=1;
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
    purchaseAdvance
  };
});
