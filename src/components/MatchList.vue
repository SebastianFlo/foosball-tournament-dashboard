<template>
  <main class="sf-match-list">
    <!-- All Teams
    {{ allTeams }}
    All Games
    {{ allGames }} -->

    <MatchGame
      v-for="game of allGames"
      :game="game"
      :key="game?.id"
    ></MatchGame>
  </main>
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
    const { allTeams, allGames } = useGame();

    return {
      allGames,
      allTeams,
    };
  },
};
</script>

<style lang="scss">
.sf-scoreboard {
  display: flex;
  grid-area: right;
}
</style>
