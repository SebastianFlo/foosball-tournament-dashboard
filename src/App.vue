<template>
  <div>
    <header class="base-pad">
      <div class="sidebar">
        <div class="wrapper">
          <nav>
            <RouterLink :to="'/?role=' + role" :query="{ role: role }"
              >Scores</RouterLink
            >
            <RouterLink
              :to="'/leaderboard?role=' + role"
              :query="{ role: role }"
              >Leaderboard</RouterLink
            >
          </nav>
          <HelloWorld msg="Foosball dashboard!" />
        </div>
      </div>
    </header>

    <section class="wrapper-teams base-pad">
      <AllTeams :expanded="route.path !== 'leaderboard'"></AllTeams>
    </section>
  </div>

  <RouterView />
</template>

<script lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AllTeams from "@/components/AllTeams.vue";
import { usePermissions } from "@/hooks/use-permissions";

export default {
  components: {
    HelloWorld,
    RouterLink,
    RouterView,
    AllTeams,
  },
  setup() {
    const route = useRoute();
    const { role } = usePermissions();

    return {
      route,
      role,
    };
  },
};
</script>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
  background: var(--sg-green);
  z-index: 2;
}

.sidebar {
  width: min-content;

  @media (max-width: 1024px) {
    width: 100%;
  }
}

.wrapper-teams {
  background: var(--sg-green);
  min-height: 100%;
  height: fit-content;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  gap: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
  text-transform: uppercase;
  background-color: var(--sg-green);
  height: 50px;
  min-width: 150px;
  color: white;
  text-align: center;
  line-height: 50px;
  font-style: italic;
  letter-spacing: 5px;
}

nav a.router-link-exact-active:hover {
  background-color: var(--sg-green);
}

nav a {
  display: inline-block;
  color: var(--color-text);
  text-transform: uppercase;
  background-color: var(--vt-c-white);
  height: 50px;
  min-width: 150px;
  color: var(--sg-green);
  text-align: center;
  line-height: 50px;
  font-style: italic;
  letter-spacing: 5px;
  padding: 0 2rem;

  &:hover {
    background-color: var(--sg-green-dark);
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-self: flex-start;
    // height: 100%;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
