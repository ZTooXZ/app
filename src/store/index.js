/* Vuex仓库管理
1：引入vue
2：引入vuex
*/
import Vue from "vue";
import Vuex from "vuex";
//使用vuex插件
Vue.use(Vuex);
/* 引入组件小仓库 */
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

//对外暴露Store类的实例
export default new Vuex.Store({
  //实现Vuex仓库模块化开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
});
