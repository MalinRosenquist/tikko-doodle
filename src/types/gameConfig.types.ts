export type SceneId = 'sunflower' | 'tomato' | 'pumpkin';

export interface SceneConfig {
  name: string;
  clickReward: number;
  stage: {
    subStepsPerStage: number[];
    subStepCost: number;
    growthFactor: number;
  };
  upgrade: {
    upgradeCost: number;
    growthFactor: number;
  };
}

export interface GameConfig {
  scenes: Record<SceneId, SceneConfig>;
}
