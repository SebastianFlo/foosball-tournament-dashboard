<template>
  <main class="sf-match-list">
    All Teams
    {{ allTeams }}
  </main>
</template>

<script lang="ts">
import { useGame } from "@/hooks/use-game";

export default {
  setup() {
    const { allTeams } = useGame();

    return {
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
