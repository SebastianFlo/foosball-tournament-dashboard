<template>
  <section class="sf-match-score">
    <div class="text-h4">
      <IconArrowDown
        class="clickable"
        @click="() => decrease('firstTeamPoints')"
      />
      {{ match.firstTeamPoints }}
      <IconArrowUp
        class="clickable"
        @click="() => increase('firstTeamPoints')"
      />
    </div>
    <div class="text-h4">-</div>
    <div class="text-h4">
      <IconArrowDown
        class="clickable"
        @click="() => decrease('secondTeamPoints')"
      />
      {{ match.secondTeamPoints }}
      <IconArrowUp
        class="clickable"
        @click="() => increase('secondTeamPoints')"
      />
    </div>
  </section>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { Game } from "@/models/game.models";
import IconArrowUp from "./icons/IconArrowUp.vue";
import IconArrowDown from "./icons/IconArrowDown.vue";
import { useGame } from "@/hooks/use-game";

export default {
  name: "MatchScore",
  components: { IconArrowUp, IconArrowDown },
  props: {
    gameId: {
      type: String,
      required: true,
    },
    first: {
      type: Boolean as PropType<Boolean>,
      default: () => true,
    },
    match: {
      type: Object as PropType<Game["match"]>,
      required: true,
    },
  },
  setup(props) {
    const { increaseScore, decreaseScore } = useGame();

    const increase = async (
      teamKey: "firstTeamPoints" | "secondTeamPoints"
    ) => {
      await increaseScore(props.gameId, teamKey, props.match.id);
    };

    const decrease = async (
      teamKey: "firstTeamPoints" | "secondTeamPoints"
    ) => {
      await decreaseScore(props.gameId, teamKey, props.match.id);
    };

    return {
      increase,
      decrease,
    };
  },
};
</script>

<style lang="scss">
.sf-match-score {
  display: flex;
  flex-direction: column;
}
</style>
