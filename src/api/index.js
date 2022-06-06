/* API接口统一管理文件  
1：引入二次封装的axios（requests）
*/
import requests from "./request";
import mockRequests from "./mockAjax";

/* TypeNav:三级联动的接口 
url：api/product/getBaseCategoryList   get  无
暴露箭头函数，当其他模块使用 该方法时，就可以发送请求
函数执行发送请求后，需要返回结果，将返回结果给其他模块使用
axios发请求返回的是Promise对象，
/* export const reqCategoryList = () => {
  //发请求
  return requests({url:'/product/getBaseCategoryList',method:'get'})
} */

// 简写
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

/* 获取banner（Home首页轮播图的接口） */
export const reqGetBannerList = () => mockRequests.get("/banner");
/* 获取floor数据 */
export const reqGetFloorList = () => mockRequests.get("/floor");
/* 获取search搜索模块数据   /api/list  POST
参数：{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
export const reqGetSearchInfo = (params) =>
  // 当前接口传递的参数 params 至少是一个 空对象
  requests({
    url: "/list",
    method: "post",
    data: params,
  });
/* 获取商品详情模块的数据  /api/item/{ skuId }  GET 参数：skuId */
export const reqGetDetailInfo = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: "get",
  });
/* 将产品添加到购物车  或 更新某个产品的数量 
/api/cart/addToCart/{ skuId }/{ skuNum }  POST 参数：skuId、skuNum */
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
/* 获取购物车列表接口   /api/cart/cartList     GET   参数：无 */
export const reqCartList = () =>
  requests({
    url: "/cart/cartList",
    method: "get",
  });
/* 删除购物车商品接口  /api/cart/deleteCart/{skuId}   DELETE   参数：skuId */
export const reqDeletCartList = (skuId) =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
/* 切换商品 选中状态   /api/cart/checkCart/{skuID}/{isChecked}  GET  参数：skuID   isChecked */
export const reqUpdateCartCheck = (skuId, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
/* 获取验证码接口  /api/user/passport/sendCode/{phone}   GET   参数：phone */
export const reqGetCode = (phone) =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
/* 用户注册   /api/user/passport/register  POST  参数：phone  password  code */
export const reqUserRegister = (data) =>
  requests({
    url: "/user/passport/register",
    method: "post",
    data,
  });
/* 用户登录  /api/user/passport/login   POST   参数：phone  password */
export const reqUserLogin = (data) =>
  requests({
    url: "/user/passport/login",
    method: "post",
    data,
  });
/* 获取用户信息【需要带token向服务器要用户信息】   /api/user/passport/auth/getUserInfo    GET */
export const reqUserInfo = () =>
  requests({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });
/* 退出登录   /api/user/passport/logout   GET  参数：无 */
export const reqLogout = () =>
  requests({
    url: "/user/passport/logout",
    method: "get",
  });
/* 获取用户地址信息   /api/user/userAddress/auth/findUserAddressList   GET*/
export const reqGetAddress = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
/* 获取交易页面信息   /api/order/auth/trade   GET */
export const reqGetTrade = () =>
  requests({
    url: "/order/auth/trade",
    method: "get",
  });
/* 提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}   POST  参数：traderNo交易编号   consignee收件人
consigneeTel收件人电话  deliveryAddress收件地址  paymentWay支付方式  orderComment订单备注  orderDetailList订单列表 */
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data,
  });
/* 获取订单支付信息    /api/payment/weixin/createNative/{orderId}  GET   参数：orderId */
export const reqPayInfo = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
/* 获取支付订单状态   /api/payment/weixin/queryPayStatus/{orderId}   GET    参数：orderId */
export const reqPaSytatus = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
/* 获取个人中心数据   /api/order/auth/{page}/{limit}    GET  参数：page   limit */
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
