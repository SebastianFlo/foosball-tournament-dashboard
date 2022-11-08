<template>
  <section class="sf-match-list">
    {{ allTeamPoints }}

    <MatchGame
      v-for="game of allGames"
      :game="game"
      :key="game?.id"
    ></MatchGame>
  </section>
</template>

<script lang="ts">
import { useGame } from "@/hooks/use-game";
import MatchGame from "./MatchGame.vue";

export default {
  name: "MatchList",
  components: {
    MatchGame,
  },
  setup() {
    const { allTeamPoints, allGames } = useGame();

    return {
      allGames,
      allTeamPoints,
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
