<template>
  <main class="sf-scoreboard">
    <MatchList></MatchList>
  </main>
</template>

<script setup lang="ts">
import MatchList from "@/components/MatchList.vue";
</script>

<style lang="scss">
.sf-scoreboard {
  width: 100%;
  display: flex;
  grid-area: right;
  justify-self: center;
  height: 100vh;
  overflow: scroll;
}
</style>
