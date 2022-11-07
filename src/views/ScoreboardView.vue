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
  display: flex;
  grid-area: right;
}
</style>
