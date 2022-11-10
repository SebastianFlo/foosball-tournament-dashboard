<template>
  <TransitionGroup tag="section" name="fade" class="sf-match-list">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="d3d3d3"
    ></v-progress-circular>

    <h1 v-if="!loading && !allGames.length">
      Games will be generated once there are at least 2 teams

      <IconCarrot />
    </h1>

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
import IconCarrot from "./icons/IconCarrot.vue";

export default {
  name: "MatchList",
  components: {
    MatchGame,
    IconCarrot,
  },
  setup() {
    const { allGames, loading } = useFirebase();
    const { canSee } = usePermissions();

    return {
      loading,
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

  .v-progress-circular {
    position: absolute;
    left: 50%;
    top: -50px;
    margin-top: 2rem;
    margin-right: 2rem;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    margin-top: 0px;
  }
}
</style>
