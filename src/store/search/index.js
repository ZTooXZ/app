import { reqGetSearchInfo } from "@/api";
// search模块小仓库
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params = {}) {
    /* 当前这个 回调函数 在调用获取服务器数据时 至少传递一个空对象
    params形参：是当前用户派发 action时，第二个参数传递过来的 至少是一个空对象 */
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};

// 计算属性：简化数据 ---将组件中需要使用的数据简化出来，方便组件调用
const getters = {
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
