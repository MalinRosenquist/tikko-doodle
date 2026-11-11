import { describe, it, expect } from 'vitest';
import { calculateSubStepCost } from '../../src/game/gameMath';

describe('calculateSubStepCost', () => {
  it('starting cost at first step should be baseCost', () => {
    const result = calculateSubStepCost(10, 1.5, 0);
    expect(result).toBe(10);
  });

  it('should calculate correct cost at step 5', () => {
    const result = calculateSubStepCost(10, 1.5, 10);
    expect(result).toBe(576.650390625);
  });
});
