<template>
  <section class="sf-match-list">
    <MatchGame
      v-for="game of allGames"
      :game="game"
      :key="game?.id"
    ></MatchGame>
  </section>
</template>

<script lang="ts">
import { useFirebase } from "@/hooks/use-firebase";
import MatchGame from "./MatchGame.vue";

export default {
  name: "MatchList",
  components: {
    MatchGame,
  },
  setup() {
    const { allGames } = useFirebase();

    return {
      allGames,
    };
  },
};
</script>

<style lang="scss">
.sf-match-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; // TODO: Dynamic
  grid-gap: 2rem;
  padding: 1rem;
}
</style>
