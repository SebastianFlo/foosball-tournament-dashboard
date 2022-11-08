<template>
  <header>
    <div>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
        <button @click="ws?.send('CHAT')">CHAT</button>
        <nav>
          <RouterLink to="/">Scores</RouterLink>
          <RouterLink to="/leaderboard">Leaderboard</RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { useGame } from "./hooks/use-game";
import { useWS } from "./hooks/websockets";

export default {
  components: {
    HelloWorld,
    RouterLink,
    RouterView,
  },
  setup() {
    const HeartbeatInterval = ref(0);
    const localTimestamp = ref(0);

    const messageCB = async function ({ data }: any) {
      if (data.startsWith("HEARTBEAT")) {
        console.log(data);
        return;
      }

      const { action, timestamp } = JSON.parse(data);

      if (!action) {
        return;
      }

      if (action === "REFRESH") {
        localTimestamp.value = timestamp;
        console.log("Refreshing data", localTimestamp.value);

        await fetchAllGames();
        await fetchAllTeams();
      }
    };

    const { fetchAllGames, fetchAllTeams } = useGame();
    const { ws } = useWS(messageCB);

    const sendHeartBeat = () => {
      const data = "HEARTBEAT--" + localTimestamp.value;
      console.log(data);
      // ws.value!.send(data);
    };

    setTimeout(() => {
      HeartbeatInterval.value = setInterval(() => {
        sendHeartBeat();
      }, 2000);
    }, 1000);

    onUnmounted(() => {
      clearInterval(HeartbeatInterval.value);
    });

    return {
      ws,
    };
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  grid-area: left;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
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
