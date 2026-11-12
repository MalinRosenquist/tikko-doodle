import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from '../../src/game/game';
import { config } from '../../src/game/gameConfig';

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
});
