<template>
  <TransitionGroup tag="section" name="fade" class="sf-match-list">
    <template v-for="game of allGames">
      <MatchGame
        v-if="canSee([game.firstTeam.name, game.secondTeam.name])"
        :game="game"
        :key="game?.id"
      ></MatchGame>
    </template>
  </TransitionGroup>
</template>

<script lang="ts">
import { useFirebase } from "@/hooks/use-firebase";
import { usePermissions } from "@/hooks/use-permissions";
import MatchGame from "./MatchGame.vue";

export default {
  name: "MatchList",
  components: {
    MatchGame,
  },
  setup() {
    const { allGames } = useFirebase();
    const { canSee } = usePermissions();

    return {
      allGames,
      canSee,
    };
  },
};
</script>

<style lang="scss">
.sf-match-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 3rem;
  padding: 3rem;
  margin-top: 10rem;
  height: fit-content;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    margin-top: 0px;
  }
}
</style>
