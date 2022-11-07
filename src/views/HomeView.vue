<template>
  <main class="sf-home">
    <div class="secondRound">
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
      <SfGameMap></SfGameMap>
    </div>
  </main>
</template>

<script setup lang="ts">
import SfGameMap from "../components/SfGameMap.vue";
</script>

<style lang="scss">
.sf-home {
  display: flex;
  grid-area: right;
}

.firstRound,
.secondRound {
  width: 400px;
}

.firstRound {
  .sf-section.sf-game-map {
    margin-top: 213px;
  }

  :first-child.sf-section.sf-game-map {
    margin-top: 123px;
  }
}
</style>
