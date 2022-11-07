<template>
  <main class="sf-match-list">
    All Teams
    {{ allTeams }}
    All Games
    {{ allGames }}

    <MatchGame game=""></MatchGame>
  </main>
</template>

<script lang="ts">
import { useGame } from "@/hooks/use-game";

export default {
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
