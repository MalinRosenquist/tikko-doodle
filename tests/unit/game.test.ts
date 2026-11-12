import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from '../../src/game/game';
import { config } from '../../src/game/gameConfig';
import type { SceneId } from '../../src/types/gameConfig.types';

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('Game Store', () => {
  it('starts with zero earnings', () => {
    const store = useGameStore();
    expect(store.currentCoins).toBe(0);
  });

  it('should increase earnings when earnCoins is called', () => {
    const store = useGameStore();
    store.currentScene = 'sunflower';
    store.earnCoins();
    expect(store.currentCoins).toBe(config.scenes[store.currentScene].clickReward);
  });
});
