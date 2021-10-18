import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const LoginRouter = () => import("@/components/login/login.vue");
const SignUpRouter = () => import("@/components/signUp/signUp.vue");
const IndexPageRouter = () => import("@/components/index/index.vue");
const IndexBody = () => import("@/components/index/indexBody.vue");
const GoodsDetailRouter = () => import("@/components/details/details.vue");
const OrderRouter = () => import("@/components/order/order.vue");
const MessageRoute = () => import("@/components/message/message.vue");
const GoodsCarRoute = () => import("@/components/goodsCar/goodsCar.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: LoginRouter,
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUpRouter,
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
        name: "GoodsDetail",
        component: GoodsDetailRouter,
      },
      {
        path: "orders",
        name: "Order",
        component: OrderRouter,
      },
      {
        path: "msg",
        name: "Message",
        component: MessageRoute,
      },
      {
        path: "gsc",
        name: "GoodsCar",
        component: GoodsCarRoute,
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
