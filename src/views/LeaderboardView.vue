<template>
  <div class="sf-leaderboard">
    <h1 v-if="!allTeamPoints.length">
      We need some winners to show the leaderboard
    </h1>
    <!-- Top 3 -->
    <div class="sf-leaderboard--top">
      <template v-for="(topTeam, i) of allTeamPoints" :key="topTeam.team.id">
        <v-card
          :color="topTeam.team.color"
          v-if="i < 3"
          :style="{ height: 170 + (3 - i) * 50 + 'px' }"
        >
          <h2>
            {{ i + 1 }}
          </h2>

          <v-chip color="white" variant="outlined">{{ topTeam.points }}</v-chip>

          <h3>{{ topTeam.team.name }}</h3>
        </v-card>
      </template>
    </div>

    <!-- The Rest -->
    <div class="sf-leaderboard--bottom">
      <template
        v-for="(bottomTeam, i) of allTeamPoints"
        :key="bottomTeam.team.id"
      >
        <v-card :color="bottomTeam.team.color" v-if="i > 2">
          {{ i + 4 }}
          {{ bottomTeam.points }}
          {{ bottomTeam.team.name }}
        </v-card>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { useFirebase } from "@/hooks/use-firebase";

export default {
  setup(props, ctx) {
    const { allTeamPoints, allGames } = useFirebase();

    return {
      allTeamPoints,
      allGames,
    };
  },
};
</script>
<style lang="scss">
.sf-leaderboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  // grid-area: right;

  h1 {
    font-size: 28px;
    font-weight: 900;
    line-height: 28px;
    text-transform: uppercase;
    padding: 2rem;
  }

  &--top {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    margin-top: 100px;

    > div {
      border: 1px solid var(--color-border);
      border-radius: 8px;
      width: 100px;
      height: 300px;
      display: grid;
      grid-template-areas:
        "place"
        "points"
        "name";
      grid-template-rows: 1fr 100px 50px;
      align-content: end;

      h2 {
        color: var(--vt-c-white);
        padding: 0 1rem;
        font-size: 2.5rem;
        grid-area: place;
        align-self: flex-start;
      }

      h3 {
        color: var(--vt-c-white);
        padding: 0 1rem;
        font-size: 1rem;
        text-transform: uppercase;
        grid-area: name;
        align-self: flex-end;
      }

      .v-chip {
        margin: 5px;
        max-width: 50px;
        width: fit-content;
        grid-area: points;
        align-self: flex-end;
      }
    }
  }

  &--bottom {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: calc(300px + 2rem);

    > div {
      border: 1px solid var(--color-border);
      border-radius: 8px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
