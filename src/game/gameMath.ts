import type { SceneId } from '@/types/gameConfig.types';

export function calculateSubStepCost(baseCost: number, growthFactor: number, step: number): number {
  return Math.round(baseCost * Math.pow(growthFactor, step));
}

export function calculateAdvanceCost(lastSubStepCost: number, advanceMultiplier: number): number {
  return Math.round(lastSubStepCost * advanceMultiplier);
}

export function getNextScene(currentScene: SceneId, sceneOrder: SceneId[]): SceneId {

  const currentSceneIndex = sceneOrder.indexOf(currentScene);
  let nextScene = currentSceneIndex + 1;

  // If the next scene index exceeds the length of the scene order, wrap around to the first scene
  if (nextScene >= sceneOrder.length) {
    nextScene = 0;
  }

  return sceneOrder[nextScene] ?? currentScene;
}