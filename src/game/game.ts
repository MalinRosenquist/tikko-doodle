import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SceneId } from '@/types/gameConfig.types';
import { config } from '@/game/gameConfig';

export const useGameStore = defineStore('game', () => {
  const playerName = ref('');
  const currentCoins = ref(0);
  const currentScene = ref<SceneId>('sunflower');
  const currentStage = ref(0);
  const purchasedSubSteps = ref(0);

  function earnCoins() {
    currentCoins.value += config.scenes[currentScene.value].clickReward;
  }

  return { playerName, currentCoins, currentScene, currentStage, purchasedSubSteps, earnCoins };
});
