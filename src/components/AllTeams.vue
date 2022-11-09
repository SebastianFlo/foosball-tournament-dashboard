<template>
  <section class="sf-all-teams">
    <v-btn class="sf-all-teams--create" dark @click.stop="dialog = true">
      Create Team

      <IconFootball />
    </v-btn>

    <v-card
      :style="{ background: team.color }"
      class="sf-all-teams--team rounded-lg"
      v-for="team of allTeams"
      :key="team?.id"
    >
      <h3>
        {{ team.name }}

        <IconEdit
          v-if="canAccess([team.name])"
          class="clickable"
          @click="editTeam"
        />
      </h3>

      <div>
        <h4>{{ team.players[0].name }}</h4>
        <h4>{{ team.players[1].name }}</h4>
      </div>
    </v-card>

    <div class="text-center">
      <CreateTeam :is-open="dialog" @close="() => (dialog = false)" />
    </div>
  </section>
</template>

<script lang="ts">
import IconEdit from "@/components/icons/IconEdit.vue";
import IconFootball from "@/components/icons/IconFootball.vue";
import { useFirebase } from "@/hooks/use-firebase";
import { usePermissions } from "@/hooks/use-permissions";
import { ref } from "vue";
import CreateTeam from "./CreateTeam.vue";

export default {
  name: "MatchList",
  components: { IconEdit, IconFootball, CreateTeam },
  setup() {
    const { allTeams } = useFirebase();
    const { canAccess } = usePermissions();

    const editTeam = () => {};
    const dialog = ref(false);

    return {
      editTeam,
      allTeams,
      dialog,
      canAccess,
    };
  },
};
</script>

<style lang="scss">
.sf-all-teams {
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
  align-items: center;
  position: relative;
  margin-top: 150px;

  button.sf-all-teams--create {
    border-radius: 8px;
    width: 300px;
    display: inline-block;
    text-transform: uppercase;
    height: 120px;
    color: var(--sg-green);
    text-align: center;
    font-style: italic;
    letter-spacing: 5px;
    padding: 0 1rem;
    background: transparent;
    border: 2px solid var(--sg-green);

    .v-btn__content {
      display: flex;
      flex-direction: column;
      color: var(--vt-c-white);

      svg {
        width: 50px;
        fill: white;
      }
    }
  }

  &--team {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    width: 300px;
    min-height: 150px;
    margin-top: 1rem;
    color: var(--vt-c-white);

    > div {
      display: flex;
      justify-content: space-around;
    }

    h3 {
      color: var(--vt-c-white);
      border-radius: 8px 8px 0px 0px;
      padding: 0.5rem;
      font-size: 0.7rem;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h4 {
      color: var(--vt-c-white);
      font-size: 1.2rem;
      display: block;
      padding: 0.5rem;
      text-transform: uppercase;
    }
  }
}
</style>
