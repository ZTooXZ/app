/* 引入API接口 回调函数 */
import { reqCategoryList, reqGetFloorList, reqGetBannerList } from "@/api";

//home模块 小仓库
const state = {
  // state中数据默认值不能瞎写，需要根据服务器返回的对象来确定数据的默认初始值
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  floorList: [],
};
const mutations = {
  CATEGEORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  /*   通过API里面的接口函数调用，向服务器发送请求，获取服务器数据
调用函数返回的是一个Promis函数吗，async和await必须连用
 */
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("CATEGEORYLIST", result.data);
    }
  },
  // 获取轮播图的数据接口
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  async getFloorList({ commit }) {
    let result = await reqGetFloorList();
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
