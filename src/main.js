import Vue from "vue";
import App from "./App.vue";

/* 全局组件注册
1：三级联动组件
*/
import TypeNav from "@/components/TypeNac";
import Carousel from "@/components/Carousel";
import Pagenation from "@/components/Pagenation";
import { Button, MessageBox } from "element-ui";
//第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagenation.name, Pagenation);
// element-ui 第一种注册方式
Vue.component(Button.name, Button);
// element 第二种注册方式：挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from "@/router";
//引入仓库
import store from "@/store";
// 引入 MockServe.js --- mock虚拟数据
import "@/mock/mockServe";
/* 轮播图插件  css样式*/
import "swiper/css/swiper.css";
// 引入 懒加载 插件
import VueLazyload from "vue-lazyload";
import loading from "@/assets/1.gif";
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading,
});
// 引入表单验证插件
import "@/plugins/validate";

/* // 测试接口调用 
import {reqCategoryList} from '@/api'
reqCategoryList() 
import { reqGetSearchInfo } from "@/api";
reqGetSearchInfo({});*/

/* 统一引入 接口API文件夹 里面的全部函数 */
import * as API from "@/api";

new Vue({
  render: (h) => h(App),
  //注册路由
  router,
  //注册仓库：组件实例的身上会多一个$store的属性
  store,
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");
