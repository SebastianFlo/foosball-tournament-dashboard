<template>
  <section class="sf-match-game">
    <!-- TEAM 1 -->
    <!-- MATCHES -->
    <!-- TEAM 2 -->

    <div class="sf-match-game--first">
      <h4>{{ game!.firstTeam.players[0].name }}</h4>
      <h3 :style="{ background: game!.firstTeam.color }">
        {{ game!.firstTeam.name }}
      </h3>
      <h4>{{ game!.firstTeam.players[1].name }}</h4>
    </div>

    <div v-if="game" class="sf-match-game--matches">
      <div
        class="sf-match-game--matches--match"
        :class="{ 'text-white': matchWinnerBg !== 'none' }"
        :style="{ background: matchWinnerBg }"
      >
        <h4>Match</h4>

        <MatchScore
          :gameId="game.id"
          :match="game.match"
          :editable="canAccess([game.firstTeam.name, game.secondTeam.name])"
        />
      </div>
      <div
        class="sf-match-game--matches--rematch"
        :class="{ 'text-white': rematchWinnerBg !== 'none' }"
        :style="{ background: rematchWinnerBg }"
      >
        <h4>Rematch</h4>

        <MatchScore
          :gameId="game.id"
          :match="game.rematch"
          :editable="
            canAccess([game.firstTeam.name, game.secondTeam.name]) &&
            matchCompleted
          "
        />
      </div>
    </div>

    <div class="sf-match-game--second">
      <h4>{{ game!.secondTeam.players[0].name }}</h4>
      <h3 :style="{ background: game!.secondTeam.color }">
        {{ game!.secondTeam.name }}
      </h3>
      <h4>{{ game!.secondTeam.players[1].name }}</h4>
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
import { usePermissions } from "@/hooks/use-permissions";

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
    const { canAccess } = usePermissions();

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

      canAccess,
    };
  },
};
</script>

<style lang="scss">
.sf-match-game {
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vt-c-black);
  white-space: nowrap;
  max-width: 400px;
  margin: 0 auto;

  &--first,
  &--second {
    display: flex;

    h4 {
      flex: 1;
      text-overflow: ellipsis;

      margin-top: 4px;
      color: var(--vt-c-black);
    }

    h3 {
      flex: 1;
      text-overflow: clip;
      text-overflow: ellipsis ellipsis;

      color: var(--vt-c-white);
      text-transform: uppercase;
      border: 1px solid var(--color-border);
      border-radius: 8px 8px 0px 0px;
      border-bottom: none;
      padding: 0.1rem 1rem;
    }
  }

  &--matches {
    border: 1px solid var(--color-border);
    border-radius: 8px;
    min-width: 300px;
    width: fit-content;
    height: 200px;
    display: flex;
    padding: 0.5rem;
    box-shadow: 0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));

    &--rematch,
    &--match {
      h4 {
        text-transform: uppercase;
        font-size: small;
        text-decoration: underline;
        color: var(--vt-c-black);
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
      color: var(--vt-c-white);
      border-radius: 0px 0px 8px 8px;
    }
  }
}
</style>
