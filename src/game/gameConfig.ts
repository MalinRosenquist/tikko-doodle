import type { GameConfig } from '../types/gameConfig.types';

export const config: GameConfig = {
  scenes: {
    sunflower: {
      name: 'Sunflower',
      clickReward: 1,
      stage: {
        subStepsPerStage: [5, 10, 15, 20, 25],
        subStepCost: 10,
        growthFactor: 1.5,
      },
      upgrade: {
        upgradeCost: 100,
        growthFactor: 2,
      },
    },
    tomato: {
      name: 'Tomato',
      clickReward: 2,
      stage: {
        subStepsPerStage: [5, 10, 15, 20, 25],
        subStepCost: 20,
        growthFactor: 2,
      },
      upgrade: {
        upgradeCost: 200,
        growthFactor: 3,
      },
    },
    pumpkin: {
      name: 'Pumpkin',
      clickReward: 3,
      stage: {
        subStepsPerStage: [5, 10, 15, 20, 25],
        subStepCost: 30,
        growthFactor: 2.5,
      },
      upgrade: {
        upgradeCost: 300,
        growthFactor: 4,
      },
    },
  },
};
