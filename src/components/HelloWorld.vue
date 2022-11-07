<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>

    <v-btn color="primary" dark @click.stop="dialog = true">
      Create Team
    </v-btn>

    <div class="text-center">
      <CreateTeam :is-open="dialog" @close="() => (dialog = false)" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import CreateTeam from "./CreateTeam.vue";

export default {
  components: {
    CreateTeam,
  },
  props: {
    msg: String,
  },
  setup(props, ctx) {
    const dialog = ref(false);

    return {
      dialog,
    };
  },
};
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
