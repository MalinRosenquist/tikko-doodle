import type { GameConfig } from '../types/gameConfig.types';

export const config: GameConfig = {
  requiredSubSteps: [5, 10, 15, 20, 25],

  scenes: {
    sunflower: {
      name: 'Sunflower',
      clickReward: 1,
      upgradeMultiplier: 5,
      stages: [
        {
          subStep: { subStepCost: 10, growthFactor: 1.5 },
        },
        {
          subStep: { subStepCost: 50, growthFactor: 1.6 },
        },
        {
          subStep: { subStepCost: 200, growthFactor: 1.7 },
        },
        {
          subStep: { subStepCost: 800, growthFactor: 1.8 },
        },
        {
          subStep: { subStepCost: 3000, growthFactor: 2.0 },
        },
      ],
    },
    tomato: {
      name: 'Tomato',
      clickReward: 1,
      upgradeMultiplier: 5,
      stages: [
        {
          subStep: { subStepCost: 10, growthFactor: 1.5 },
        },
        {
          subStep: { subStepCost: 50, growthFactor: 1.6 },
        },
        {
          subStep: { subStepCost: 200, growthFactor: 1.7 },
        },
        {
          subStep: { subStepCost: 800, growthFactor: 1.8 },
        },
        {
          subStep: { subStepCost: 3000, growthFactor: 2.0 },
        },
      ],
    },
    pumpkin: {
      name: 'Pumpkin',
      clickReward: 1,
      upgradeMultiplier: 5,
      stages: [
        {
          subStep: { subStepCost: 10, growthFactor: 1.5 },
        },
        {
          subStep: { subStepCost: 50, growthFactor: 1.6 },
        },
        {
          subStep: { subStepCost: 200, growthFactor: 1.7 },
        },
        {
          subStep: { subStepCost: 800, growthFactor: 1.8 },
        },
        {
          subStep: { subStepCost: 3000, growthFactor: 2.0 },
        },
      ],
    },
  },
};
