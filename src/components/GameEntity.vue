<template>
  <button class="game-entity">
    <img
      class="game-entity-image"
      src="@/assets/images/entities/sunflower-stage-1.png"
      alt="Sunflower"
    />
  </button>
</template>

<style scoped>
.game-entity {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
}

.game-entity-image {
  width: 100px;
}
</style>
