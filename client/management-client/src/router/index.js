import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const LoginRouter = () => import("@/components/login/login.vue");
const IndexPageRouter = () => import("@/components/index/index.vue");
const IndexBody = () => import("@/components/index/indexBody.vue");
const GoodsDetailRouter = () => import("@/components/details/details.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: LoginRouter,
  },
  {
    path: "/index",
    name: "Index",
    component: IndexPageRouter,
    redirect: { name: "IndexBody" },
    children: [
      {
        path: "goods",
        name: "IndexBody",
        component: IndexBody,
      },
      {
        path: "details/:goodsId",
        name: "Index",
        component: GoodsDetailRouter,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
