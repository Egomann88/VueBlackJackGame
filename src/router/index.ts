import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/Main.vue";
import Shop from "../components/Shop.vue";
import Upgrades from "../components/Upgrades.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Main,
    },
    {
      path: "/shop",
      component: Shop,
    },
    {
      path: "/upgrades",
      component: Upgrades
    },
    {
      path: "/:pathMatch(.*)",
      component: Main,
    },
  ],
});

export default router;
