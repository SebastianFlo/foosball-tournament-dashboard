import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import ScoreboardView from "../views/ScoreboardView.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "scoreboard",
      component: ScoreboardView,
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LeaderboardView.vue"),
    },
  ],
});

export default router;
