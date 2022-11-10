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

          <v-chip label class="sf-leaderboard--top--wins" color="white">
            {{ topTeam.wins }} / {{ topTeam.losses }}
          </v-chip>

          <v-chip
            class="sf-leaderboard--top--points"
            color="white"
            variant="outlined"
            >{{ topTeam.points }}</v-chip
          >

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
          <h2>
            {{ i + 1 }}
          </h2>

          <h3>{{ bottomTeam.team.name }}</h3>

          <v-chip label color="white">
            {{ bottomTeam.wins }} / {{ bottomTeam.losses }}
          </v-chip>

          <v-chip color="white" variant="outlined">{{
            bottomTeam.points
          }}</v-chip>
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
  margin-bottom: 2rem;

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
        "name"
        "wins"
        "points";
      grid-template-rows: 1fr 50px 60px 40px;
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

      .sf-leaderboard--top--wins,
      .sf-leaderboard--top--points {
        margin: 5px;
        justify-content: center;
        align-self: flex-end;
      }

      .sf-leaderboard--top--wins {
        grid-area: wins;
      }
      .sf-leaderboard--top--points {
        grid-area: points;
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
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: var(--vt-c-white);
        padding: 0 1rem;
        font-size: 2rem;
      }

      h3 {
        color: var(--vt-c-white);
        font-size: 0.8rem;
        text-transform: uppercase;
        grid-area: name;
      }
    }
  }
}
</style>
