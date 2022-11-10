<template>
  <section class="sf-all-teams">
    <v-btn class="sf-all-teams--create" dark @click.stop="dialog = true">
      Create Team

      <IconFootball />
    </v-btn>

    <v-btn
      v-if="smallScreen"
      variant="tonal"
      color="#fff"
      elevation="2"
      outlined
      @click="toggleTeams"
      >{{ showTeams ? "Hide Teams ⬆" : "Show Teams ⬇" }}</v-btn
    >

    <template v-if="showTeams">
      <v-card
        class="sf-all-teams--team rounded-lg clickable"
        :color="canSee([team.name]) ? team.color : '#d3d3d3'"
        @click="() => toggleShow([team.name])"
        v-for="team of allTeams"
        :key="team?.id"
      >
        <h3>
          {{ team.name }}

          <IconEdit
            v-if="canAccess([team.name])"
            class="clickable"
            @click.prevent="editTeam"
          />
        </h3>

        <div>
          <h4>{{ team.players[0].name }}</h4>
          <h4>{{ team.players[1].name }}</h4>
        </div>
      </v-card>
    </template>

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
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import CreateTeam from "./CreateTeam.vue";

export default {
  name: "MatchList",
  components: { IconEdit, IconFootball, CreateTeam },
  setup() {
    const { allTeams } = useFirebase();
    const { canAccess, toggleShow, canSee } = usePermissions();

    const editTeam = () => {};
    const dialog = ref(false);
    const smallScreen = ref(false);
    const showTeams = ref(!smallScreen.value);

    onMounted(() => {
      smallScreen.value = window.innerWidth < 1024;
      showTeams.value = !smallScreen.value;

      nextTick(() => {
        window.addEventListener("resize", onResize);
      });
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
    });

    const onResize = () => {
      console.log("on resize");
      smallScreen.value = window.innerWidth < 1024;
      showTeams.value = !smallScreen.value;
    };

    const toggleTeams = () => {
      showTeams.value = !showTeams.value;
    };

    return {
      smallScreen,
      toggleTeams,
      showTeams,

      editTeam,
      allTeams,
      dialog,

      canAccess,
      canSee,
      toggleShow,
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
  gap: 2rem;

  @media (max-width: 1024px) {
    margin-top: 50px;
    button {
      width: 100%;
    }
  }

  button.sf-all-teams--create {
    border-radius: 8px;
    text-transform: uppercase;
    height: 40px;
    color: var(--vt-c-black);
    text-align: center;
    font-style: italic;
    letter-spacing: 5px;
    background: var(--vt-c-white);

    .v-btn__content {
      display: flex;
      justify-content: space-between;

      svg {
        width: 25px;
        fill: black;
        margin-left: 10px;
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
