// 路由配置信息

//引入路由组件
// import Home from "@/pages/Home";
// import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
// 引入二级路由
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

/* 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件
分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。 */

export default [
  {
    path: "/center",
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "",
        redirect: "myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    name: "PaySuccess",
    meta: { show: true },
  },
  {
    path: "/pay",
    component: Pay,
    name: "Pay",
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next("/trade");
      }
    },
  },
  {
    path: "/trade",
    component: Trade,
    name: "Trade",
    meta: { show: true },
    // 路由独享守卫
    /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
    name: "ShopCart",
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    name: "addcartsuccess",
    meta: { show: true },
  },
  {
    path: "/detail/:skuId",
    component: Detail,
    meta: { show: true },
  },
  {
    path: "/home",
    // 路由懒加载
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true },
    name: "search",
    //只能传递params参数
    /* //第一种：布尔值
    props:true, */

    /* //对象写法：额外的给路由组件传递一些props
    props:{a:1,b:2} */

    /* //函数写法：可以将params参数和query参数，通过props传递给路由组件
    props:($route)=>{
      return {keyword:$route.params.keyword,k:$route.query.k}
    }, */
    //简写
    props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k }),
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },
  // 重定向，项目启动时默认跳转到首页
  {
    path: "*",
    redirect: "/home",
  },
];
