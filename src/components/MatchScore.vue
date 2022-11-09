<template>
  <section class="sf-match-score">
    <div class="sf-match-score--team text-h4">
      <IconArrowDown
        v-if="editable && match.firstTeamPoints > 0"
        class="clickable"
        @click="() => decrease('firstTeamPoints')"
      />
      <p>{{ match.firstTeamPoints }}</p>
      <IconArrowUp
        v-if="
          editable && match.firstTeamPoints < 10 && match.secondTeamPoints < 10
        "
        class="clickable"
        @click="() => increase('firstTeamPoints')"
      />
    </div>
    <div class="text-h4">-</div>
    <div class="sf-match-score--team text-h4">
      <IconArrowDown
        v-if="editable && match.secondTeamPoints > 0"
        class="clickable"
        @click="() => decrease('secondTeamPoints')"
      />
      <p>{{ match.secondTeamPoints }}</p>
      <IconArrowUp
        v-if="
          editable && match.secondTeamPoints < 10 && match.firstTeamPoints < 10
        "
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
import { useFirebase } from "@/hooks/use-firebase";

export default {
  name: "MatchScore",
  components: { IconArrowUp, IconArrowDown },
  props: {
    gameId: {
      type: String,
      required: true,
    },
    editable: {
      type: Boolean as PropType<Boolean>,
      default: () => true,
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
    const { increaseScore, decreaseScore } = useFirebase();

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
  align-items: center;

  &--team {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 50px);

    p,
    svg {
      justify-self: center;
    }

    p {
      grid-column: 2;
    }
  }
}
</style>
