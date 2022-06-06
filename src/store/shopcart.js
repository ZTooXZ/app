import { reqCartList, reqDeletCartList, reqUpdateCartCheck } from "@/api";

const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  // 获取 购物车列表的数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  // 删除 购物车列表商品
  async deleteCartList({ commit }, skuId) {
    let result = await reqDeletCartList(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 修改 商品选中状态
  async updateChecked({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCartCheck(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 删除 所有选中 的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    // 定义一个数组接收promise 返回结果
    let PromiseAll = [];
    // 获取 仓库 中 存放的所有商品信息
    getters.cartList.cartInfoList.forEach((item) => {
      // 如果被选中则 调用deleteCartList
      let promise;
      if (item.isChecked == 1) {
        promise = dispatch("deleteCartList", item.skuId);
      }
      // 将每一次 promise 信息 添加到 数组中
      PromiseAll.push(promise);
    });
    // 只有 全部的 promise 信息都为真时 才返回成功
    return Promise.all(PromiseAll);
  },
  // 修改 全选状态
  updateAllChecked({ dispatch, state }, isChecked) {
    // 定义数组 接收 dispatch 返回的promise 结果
    let PromiseAll = [];
    // 获取当前所有商品
    state.cartList[0].cartInfoList.forEach((item) => {
      // 判断 item 的isChecked , 将所有 item的isChecked 状态 与 全选一致
      let promise = dispatch("updateChecked", { skuId: item.skuId, isChecked });
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
};
const getters = {
  // 简化数据
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
