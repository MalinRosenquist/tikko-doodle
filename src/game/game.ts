import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { SceneId } from '@/types/gameConfig.types';
import { config } from '@/game/gameConfig';
import { calculateSubStepCost, calculateAdvanceCost, getNextScene } from './gameMath';

export const useGameStore = defineStore('game', () => {
  const playerName = ref('');
  const currentCoins = ref(0);
  const currentScene = ref<SceneId>('sunflower');
  const currentStage = ref(0);
  const purchasedSubSteps = ref(0);

  const subStepCost = computed(() => {
    const stage = config.scenes[currentScene.value].stages[currentStage.value]; // If the stage is undefined, return early

    if (!stage) {
      return 0;
    }

    return calculateSubStepCost(
      stage.subStep.subStepCost,
      stage.subStep.growthFactor,
      purchasedSubSteps.value,
    );
  });

  const advanceCost = computed(() => {
    const stage = config.scenes[currentScene.value].stages[currentStage.value];
    const scene = config.scenes[currentScene.value];

    if (!stage) {
      return 0;
    }

    // Calculate the cost of latest sub-step
    const lastSubStepCost = calculateSubStepCost(
      stage.subStep.subStepCost,
      stage.subStep.growthFactor,
      purchasedSubSteps.value - 1,
    );

    // Calculate the cost of advancing to the next stage
    return calculateAdvanceCost(lastSubStepCost, scene.advanceMultiplier);
  });

  const isReadyToAdvance = computed(() => {
    const maxSubStepsForStage = config.requiredSubSteps[currentStage.value];

    if (maxSubStepsForStage === undefined) {
      return false;
    } else {
      return purchasedSubSteps.value >= maxSubStepsForStage;
    }
  });

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

    // Check if the player has enough coins to purchase the sub-step, if so, deduct the cost and increment the purchased sub-steps
    if (currentCoins.value >= subStepCost.value) {
      currentCoins.value -= subStepCost.value;
      purchasedSubSteps.value += 1;
    }
  }

  function purchaseAdvance() {
    const stage = config.scenes[currentScene.value].stages[currentStage.value];
    const maxSubStepsForStage = config.requiredSubSteps[currentStage.value]; // If the stage is undefined, return early

    if (!stage) {
      return;
    }

    // Check if the player has purchased the maximum number of sub-steps for the current stage
    if (maxSubStepsForStage === undefined || purchasedSubSteps.value !== maxSubStepsForStage) {
      return;
    }

    // Check if the player has enough coins to advance, if not, return early
    if (currentCoins.value < advanceCost.value) {
      return;
    }

    currentCoins.value -= advanceCost.value;
    purchasedSubSteps.value = 0;

    const isLastStage = currentStage.value === config.requiredSubSteps.length - 1; // If the current stage is not the last stage, advance to the next stage

    if (!isLastStage) {
      currentStage.value += 1;
      return;
    }

    currentScene.value = getNextScene(currentScene.value, config.sceneOrder);
    currentStage.value = 0;
  }

  return {
    playerName,
    currentCoins,
    currentScene,
    currentStage,
    purchasedSubSteps,
    subStepCost,
    advanceCost,
    isReadyToAdvance,
    earnCoins,
    purchaseSubStep,
    purchaseAdvance,
  };
});
