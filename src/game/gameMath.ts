export function calculateSubStepCost(baseCost: number, growthFactor: number, step: number): number {
  return Math.round(baseCost * Math.pow(growthFactor, step));
}

export function calculateUpgradeCost(lastSubStepCost: number, upgradeMultiplier: number): number {
  return Math.round(lastSubStepCost * upgradeMultiplier);
}
