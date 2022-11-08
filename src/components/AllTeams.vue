<template>
  <section class="sf-all-teams">
    <div class="sf-all-teams--team" v-for="team of allTeams" :key="team?.id">
      <h3 :style="{ background: team.color }">
        {{ team.name }}

        <IconEdit class="clickable" @click="editTeam" />
      </h3>

      <div>
        <h4>{{ team.players[0].name }}</h4>
        <h4>{{ team.players[1].name }}</h4>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useGame } from "@/hooks/use-game";
import IconEdit from "@/components/icons/IconEdit.vue";
import { onMounted } from "vue";

export default {
  name: "MatchList",
  components: { IconEdit },
  setup() {
    const { allTeams, fetchAllTeams } = useGame();

    const editTeam = () => {};

    onMounted(async () => {
      await fetchAllTeams();
    });

    return {
      editTeam,
      allTeams,
    };
  },
};
</script>

<style lang="scss">
.sf-all-teams {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &--team {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    max-width: 300px;
    min-height: 200px;

    h3 {
      border-radius: 8px 8px 0px 0px;
      padding: 0.5rem;
      font-size: 0.7rem;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h4 {
      display: block;
      padding: 0.5rem;
    }
  }
}
</style>
