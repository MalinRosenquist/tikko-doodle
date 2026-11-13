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

    // Check if the player has enough coins to purchase the sub-step, if so, deduct the cost and increment the purchased sub-steps
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

    // Calculate the cost of latest sub-step
    const lastSubStepCost = calculateSubStepCost(
      stage.subStep.subStepCost,
      stage.subStep.growthFactor,
      purchasedSubSteps.value - 1,
    );

    // Calculate the cost of advancing to the next stage
    const advanceCost = calculateAdvanceCost(lastSubStepCost, scene.advanceMultiplier);

    // Check if the player has enough coins to advance, if so, deduct the cost and advance to the next stage
    if (currentCoins.value >= advanceCost) {
      currentCoins.value -= advanceCost;
      purchasedSubSteps.value = 0;
      currentStage.value += 1;
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
    purchaseAdvance,
  };
});
