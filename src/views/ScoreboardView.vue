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
  justify-self: center;
  height: 100%;
  overflow: scroll;

  @media (min-width: 1024px) {
    padding-right: 20px;
  }
}
</style>
