import { reqAddOrUpdateShopCart, reqGetDetailInfo } from "@/api/index";
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETDETAILINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  async getDetailInfo({ commit }, skuId) {
    let result = await reqGetDetailInfo(skuId);
    if (result.code == 200) {
      commit("GETDETAILINFO", result.data);
    }
  },
  // 将产品添加到购物车中||修改商品数量
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    /* 发请求：前端带 商品参数 给服务器，存储成功，没有返回数据
    所以，不再需要三连环 （仓库存储数据） 
    注意：async 函数执行返回的结果 一定是 一个 Promise 函数【要么成功，要么失败】*/
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("falie"));
    }
  },
};
const getters = {
  categoryView(state) {
    // categoryView 不能成为undefined 因为当服务器没有 返回数据时 如果 categoryView为undefined 则会报错
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 产品售卖属性
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
