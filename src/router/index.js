/* 路由配置 
  1：引入vue
  2：引入vue-router
*/
import Vue from "vue";
import VueRouter from "vue-router";

// 引入 路由配置文件
import routes from "./routes";
import store from "@/store";

//使用插件
Vue.use(VueRouter);

/* 重写push方法
先保存一份VueRouter原型对象的push|replace
*/
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
/* 
  第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
*/
VueRouter.prototype.push = function (location, resolve, reject) {
  //需要前后文是否为vueRouter的实例
  //判断是否有resolve和reject
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由
let router = new VueRouter({
  //配置路由
  routes,
  // 配置滚动行为
  scrollBehavior(to, from, savedPosition) {
    // y 控制离头部的距离
    return { y: 0 };
  },
});

// 全局守卫：前置守卫（路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  /*  to：获取到你要跳转到那个界面   from：可以获取你从那个路由来  
    next()：放行函数 next(path);  放行到指定 路由界面  next(false);
 */
  // next();
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    // 登录的情况
    if (to.path == "/login" || to.path == "/register") {
      // 登陆后 就不能再 跳转到 login界面了
      next("/");
    } else {
      // 已经登录 ，访问的不是登录与注册
      //登录了，且有用户信息
      if (name) {
        next();
      } else {
        // 登陆了 但没有用户信息
        // 在路由跳转之前  获取用户信息,然后放行
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token 字段失效|过期  ，重新登录
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    // 未登录，不能去支付相关，个人中心
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      // 将未登录的时候 去 而没去成 的路由 存储在地址栏中
      next("/login/?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
