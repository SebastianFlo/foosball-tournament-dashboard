<template>
  <main class="sf-scoreboard">
    <AllTeams></AllTeams>

    <MatchList></MatchList>
  </main>
</template>

<script setup lang="ts">
import MatchList from "@/components/MatchList.vue";
import AllTeams from "@/components/AllTeams.vue";
</script>

<style lang="scss">
.sf-scoreboard {
  display: flex;
  grid-area: right;
}
</style>
