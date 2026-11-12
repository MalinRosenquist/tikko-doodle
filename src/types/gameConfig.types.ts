export type SceneId = 'sunflower' | 'tomato' | 'pumpkin';

// Configuration for each scene in the game
export interface SceneConfig {
  name: string;
  clickReward: number;
  advanceMultiplier: number;
  stages: StageConfig[];
}

// Configuration for each stage within a scene
export interface StageConfig {
  subStep: {
    subStepCost: number;
    growthFactor: number;
  };
}

export interface GameConfig {
  requiredSubSteps: number[];
  scenes: Record<SceneId, SceneConfig>;
}
