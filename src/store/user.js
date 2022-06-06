import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api";
import { setToken, getToken, clearToken } from "@/utils/token";
/* 注册、登录模块仓库 */
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 清除 用户相关数据
  CLEARUSERINFO(state) {
    state.token = "";
    state.userInfo = {};
    // 清空本地存储的token
    clearToken();
  },
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 注册
  async userRegister({ commit }, data) {
    let result = await reqUserRegister(data);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 登录  [token]
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    // 服务器下发的token 是用户的唯一标识符
    // 通过token 找服务器 获取用户信息进行展示
    if (result.code == 200) {
      // 用户登录成功 获取到了token
      commit("USERLOGIN", result.data.token);
      // 持久化 token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    // 当前退出登录 只是通知服务器 清除 服务器的token
    let result = await reqLogout();
    if (result.code == 200) {
      commit("CLEARUSERINFO");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
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
