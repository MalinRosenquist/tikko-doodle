import { describe, it, expect } from 'vitest';
import { calculateSubStepCost } from '../../src/game/gameMath';

describe('calculateSubStepCost', () => {
  it('starting cost at first step should be baseCost', () => {
    const result = calculateSubStepCost(10, 1.5, 0);
    expect(result).toBe(10);
  });

  it('should calculate correct cost at step 2 and rounds up', () => {
    const result = calculateSubStepCost(10, 1.5, 2);
    expect(result).toBe(23);
  });

  it('should calculate correct cost at step 9 and rounds down', () => {
    const result = calculateSubStepCost(10, 1.5, 9);
    expect(result).toBe(384);
  });
});
