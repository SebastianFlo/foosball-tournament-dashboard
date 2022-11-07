<template>
  <section class="sf-match-game">
    <!-- TEAM 1 -->
    <!-- MATCHES -->
    <!-- TEAM 2 -->

    <div class="sf-match-game--first">
      <h4>Seb</h4>
      <h3 :style="{ background: game!.firstTeam.color }">First</h3>
      <h4>Thea</h4>
    </div>

    <div v-if="game" class="sf-match-game--matches">
      <div
        class="sf-match-game--matches--match"
        :style="{ background: matchWinnerBg }"
      >
        <h4>Match</h4>

        <MatchScore :gameId="game.id" :match="game.match" :editable="true" />
      </div>
      <div
        class="sf-match-game--matches--rematch"
        :style="{ background: rematchWinnerBg }"
      >
        <h4>Rematch</h4>

        <MatchScore
          :gameId="game.id"
          :match="game.rematch"
          :editable="matchCompleted"
        />
      </div>
    </div>
    <div class="sf-match-game--second">
      <h4>Seb</h4>
      <h3 :style="{ background: game!.secondTeam.color }">Second</h3>
      <h4>Thea</h4>
    </div>

    <!-- id: string;
  firstTeam: Team;
  secondTeam: Team;
  match: {
    firstTeamPoints: number;
    secondTeamPoints: number;
  };
  rematch: {
    firstTeamPoints: number;
    secondTeamPoints: number;
  }; -->
  </section>
</template>

<script lang="ts">
import { computed, type PropType } from "vue";
import type { Game } from "@/models/game.models";
import MatchScore from "./MatchScore.vue";

export default {
  name: "MatchGame",
  components: {
    MatchScore,
  },
  props: {
    game: {
      type: Object as PropType<Game | null>,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const matchCompleted = computed(() => {
      return (
        props.game?.match.firstTeamPoints === 10 ||
        props.game?.match.secondTeamPoints === 10
      );
    });

    const matchWinnerBg = computed(() => {
      if (props.game?.match.firstTeamPoints === 10) {
        return props.game.firstTeam.color;
      }

      if (props.game?.match.secondTeamPoints === 10) {
        return props.game.secondTeam.color;
      }

      return "none";
    });

    const rematchWinnerBg = computed(() => {
      if (props.game?.rematch.firstTeamPoints === 10) {
        return props.game.firstTeam.color;
      }

      if (props.game?.rematch.secondTeamPoints === 10) {
        return props.game.secondTeam.color;
      }

      return "none";
    });

    return {
      matchCompleted,

      matchWinnerBg,
      rematchWinnerBg,
    };
  },
};
</script>

<style lang="scss">
.sf-match-game {
  margin-bottom: 1rem;
  text-align: center;

  &--first,
  &--second {
    display: flex;
    justify-content: space-around;

    h4 {
      margin-top: 4px;
    }

    h3 {
      text-transform: uppercase;
      border: 1px solid var(--color-border);
      border-radius: 8px 8px 0px 0px;
      border-bottom: none;
      padding: 0.1rem 1rem;

      // &:before {
      //   content: "";
      //   display: block;
      //   width: 50px;
      //   height: 1px;
      //   background: var(--color-border);
      //   left: 66px;
      //   top: 50%;
      //   position: absolute;
      // }

      // &:after {
      //   content: "";
      //   display: block;
      //   width: 50px;
      //   height: 1px;
      //   background: var(--color-border);
      //   right: 66px;
      //   top: 50%;
      //   position: absolute;
      // }
    }
  }

  &--matches {
    border: 1px solid var(--color-border);
    border-radius: 8px;
    min-width: 300px;
    height: 200px;
    display: flex;
    padding: 0.5rem;

    &--rematch,
    &--match {
      h4 {
        text-transform: uppercase;
        font-size: small;
        text-decoration: underline;
      }
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    &--match {
      border-right: 1px solid var(--color-border);
      border-radius: 8px 0px 0px 8px;
    }

    &--rematch {
      border-radius: 0px 8px 8px 0px;
    }
  }

  &--second {
    h3 {
      border-radius: 0px 0px 8px 8px;
    }
  }
}
</style>
