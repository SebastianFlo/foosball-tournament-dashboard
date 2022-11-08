<template>
  <div class="sf-leaderboard">
    <h1>This the leaderboard page</h1>
    <!-- Top 3 -->
    <div class="sf-leaderboard--top">
      <template v-for="(topTeam, i) of allTeamPoints" :key="topTeam.team.id">
        <div v-if="i < 3" :style="{ height: (3 - i) * 100 + 'px' }">
          {{ i + 1 }}
          {{ topTeam.points }}
          {{ topTeam.team.name }}
        </div>
      </template>
    </div>

    <!-- The Rest -->
    <div class="sf-leaderboard--bottom">
      <template
        v-for="(bottomTeam, i) of allTeamPoints"
        :key="bottomTeam.team.id"
      >
        <div v-if="i > 2">
          {{ i + 4 }}
          {{ bottomTeam.points }}
          {{ bottomTeam.team.name }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { useFirebase } from "@/hooks/use-firebase";

export default {
  setup(props, ctx) {
    const { allTeamPoints } = useFirebase();

    return {
      allTeamPoints,
    };
  },
};
</script>
<style lang="scss">
.sf-leaderboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &--top {
    display: flex;
    align-items: flex-end;
    gap: 1rem;

    > div {
      border: 1px solid var(--color-border);
      border-radius: 8px;
      width: 100px;
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  &--bottom {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

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
