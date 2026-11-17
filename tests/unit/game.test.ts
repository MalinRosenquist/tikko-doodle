import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from '../../src/game/game';
import { config } from '../../src/game/gameConfig';
import { calculateAdvanceCost, calculateSubStepCost } from '@/game/gameMath';

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('Game Store', () => {
  it('starts with zero earnings', () => {
    const store = useGameStore();
    expect(store.currentCoins).toBe(0);
  });

  it('should increase earnings when earnCoins is called', () => {
    const store = useGameStore();
    store.currentScene = 'sunflower';
    store.earnCoins();
    expect(store.currentCoins).toBe(config.scenes[store.currentScene].clickReward);
  });

  it('should not allow purchasing sub-steps if the player has insufficient coins', () => {
    const store = useGameStore();
    store.currentScene = 'sunflower';
    store.currentStage = 0;
    store.currentCoins = 0;
    store.purchaseSubStep();
    expect(store.purchasedSubSteps).toBe(0);
  });

  it('should allow purchasing sub-steps if the player has sufficient coins', () => {
    const store = useGameStore();
    store.currentScene = 'sunflower';
    store.currentStage = 0;

    const stageConfig = config.scenes[store.currentScene].stages[store.currentStage]!;
    const cost = stageConfig.subStep.subStepCost;

    store.currentCoins = cost;
    store.purchaseSubStep();

    expect(store.purchasedSubSteps).toBe(1);
    expect(store.currentCoins).toBe(0);
  });

  it('should not allow purchasing more sub-steps than the maximum for the current stage', () => {
    const store = useGameStore();
    store.currentScene = 'sunflower';
    store.currentStage = 0;

    const maxSubStepsForStage = config.requiredSubSteps[store.currentStage]!;

    store.purchasedSubSteps = maxSubStepsForStage;
    store.currentCoins = 9999999;

    store.purchaseSubStep();

    expect(store.purchasedSubSteps).toBe(maxSubStepsForStage);
    expect(store.currentCoins).toBe(9999999);
  });

  it('should not allow advancing if sub-steps are not maxed out', () => {
    const store = useGameStore();
    store.currentScene = 'sunflower';
    store.currentStage = 0;
    store.purchasedSubSteps = 0;
    store.currentCoins = 9999999;
    store.purchaseAdvance();

    expect(store.currentStage).toBe(0);
  });

  it('should not allow advancing if the player has insufficient coins', () => {
    const store = useGameStore();
    store.currentScene = 'sunflower';
    store.currentStage = 0;

    const maxSubStepsForStage = config.requiredSubSteps[store.currentStage]!;
    store.purchasedSubSteps = maxSubStepsForStage;
    store.currentCoins = 0;

    store.purchaseAdvance();

    expect(store.currentStage).toBe(0);
  });

  it('should allow advancing when sub-steps are maxed and coins are sufficient', () => {
    const store = useGameStore();
    store.currentScene = 'sunflower';
    store.currentStage = 0;

    const maxSubStepsForStage = config.requiredSubSteps[store.currentStage]!;
    store.purchasedSubSteps = maxSubStepsForStage;

    const stageConfig = config.scenes[store.currentScene].stages[store.currentStage]!;
    const sceneConfig = config.scenes[store.currentScene]!;

    const lastSubStepCost = calculateSubStepCost(
      stageConfig.subStep.subStepCost,
      stageConfig.subStep.growthFactor,
      maxSubStepsForStage - 1,
    );
    const advanceCost = calculateAdvanceCost(lastSubStepCost, sceneConfig.advanceMultiplier);

    store.currentCoins = advanceCost;
    store.purchaseAdvance();

    expect(store.currentStage).toBe(1);
    expect(store.purchasedSubSteps).toBe(0);
    expect(store.currentCoins).toBe(0);
  });

  it('should transition to the next scene when advancing from the last stage', () => {
    const store = useGameStore();

    store.currentScene = config.sceneOrder[0]!;
    const lastStageIndex = config.requiredSubSteps.length - 1;
    store.currentStage = lastStageIndex;

    const maxSubStepsForStage = config.requiredSubSteps[lastStageIndex]!;
    store.purchasedSubSteps = maxSubStepsForStage;

    const stageConfig = config.scenes[store.currentScene].stages[lastStageIndex]!;
    const sceneConfig = config.scenes[store.currentScene]!;
    const lastSubStepCost = calculateSubStepCost(
      stageConfig.subStep.subStepCost,
      stageConfig.subStep.growthFactor,
      maxSubStepsForStage - 1,
    );
    const advanceCost = calculateAdvanceCost(lastSubStepCost, sceneConfig.advanceMultiplier);

    store.currentCoins = advanceCost;
    store.purchaseAdvance();

    expect(store.currentScene).toBe(config.sceneOrder[1]);
    expect(store.currentStage).toBe(0);
    expect(store.purchasedSubSteps).toBe(0);
    expect(store.currentCoins).toBe(0);
  });

  it('should loop back to the first scene when advancing from the last stage of the last scene', () => {
    const store = useGameStore();

    const lastSceneIndex = config.sceneOrder.length - 1;
    store.currentScene = config.sceneOrder[lastSceneIndex]!;

    const lastStageIndex = config.requiredSubSteps.length - 1;
    store.currentStage = lastStageIndex;

    const maxSubStepsForStage = config.requiredSubSteps[lastStageIndex]!;
    store.purchasedSubSteps = maxSubStepsForStage;

    const stageConfig = config.scenes[store.currentScene].stages[lastStageIndex]!;
    const sceneConfig = config.scenes[store.currentScene]!;
    const lastSubStepCost = calculateSubStepCost(
      stageConfig.subStep.subStepCost,
      stageConfig.subStep.growthFactor,
      maxSubStepsForStage - 1,
    );
    const advanceCost = calculateAdvanceCost(lastSubStepCost, sceneConfig.advanceMultiplier);

    store.currentCoins = advanceCost;
    store.purchaseAdvance();

    expect(store.currentScene).toBe(config.sceneOrder[0]);
    expect(store.currentStage).toBe(0);
    expect(store.purchasedSubSteps).toBe(0);
  });
});
