<template>
  <main class="sf-scoreboard pr-5">
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
}
</style>
