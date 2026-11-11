export function calculateSubStepCost(baseCost: number, growthFactor: number, step: number): number {
  return Math.round(baseCost * Math.pow(growthFactor, step));
}
