import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/Main.vue";
import Shop from "../components/Shop.vue";

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
      path: "/:pathMatch(.*)",
      component: Main,
    },
  ],
});

export default router;
