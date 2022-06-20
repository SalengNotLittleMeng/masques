import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
const routes = [
  //   {
  //     path: "/",
  //     name: "Home",
  //     component: Home,
  //     children: [
  //     ],
  //   },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

export default router;
