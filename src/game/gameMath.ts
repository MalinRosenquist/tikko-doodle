export function calculateSubStepCost(baseCost: number, growthFactor: number, step: number): number {
  return baseCost * growthFactor ** step;
}
