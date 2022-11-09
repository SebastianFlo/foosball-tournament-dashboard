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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 3rem;
  padding: 3rem;
  margin-top: 10rem;
  height: fit-content;
}
</style>
