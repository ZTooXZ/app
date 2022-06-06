<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的位置 -->
    <router-view></router-view>
    <!-- 在home，search下显示，在登录、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    /* 派发一个action || 获取商品分类的三级联动列表数据 */
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
