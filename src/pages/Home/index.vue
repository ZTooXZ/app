<template>
  <div>
    <!-- 引入全局组件（已经在入口文件注册了，不需要再引入了） -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
//引入轮播图组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

//引入vuex辅助函数
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  mounted() {
    /* 派发获取floor数据的action */
    this.$store.dispatch("getFloorList");
    /*     // 获取用户信息在首页展示
    this.$store.dispatch("getUserInfo"); */
  },

  methods: {},
};
</script>

<style lang="less" scoped></style>
