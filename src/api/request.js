/* 对axios 进行二次封装 
1：引入axios
2:利用axios对象的方法 create ，去创建一个axios实例
3：request就是axios，只不过是稍微配置了一下

4:引入进度条
  --start()方法：进度条开始
  --done()方法：进度条结束
5：引入进度条样式
  -- 修改进度条样式
  #nprogress .bar {
  background: rgb(39, 8, 8);
*/
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// 在当前模引入 store 模块
import store from "@/store";

const requests = axios.create({
  // 配置对象：接口当中路径都带有api --配置为基础路径，当请求路径中出现api时可以省略不写
  baseURL: "/api",
  // 请求超时的事件，请求超过5s，代表请求失败
  timeout: 5000,
});

// 请求拦截器：在发请求之前，被请求拦截器监测，可以在请求发送之前处理相应业务逻辑
requests.interceptors.request.use((config) => {
  // config:配置对象，对象里面重要的属性就是 ：headers请求头
  // uuid 判断是否存在,  存在则让请求头带给后端
  if (store.state.detail.uuid_token) {
    // 给请求头添加字段(userTempId)：
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 携带 token 给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  // 进度条开始
  nprogress.start();
  return config;
});

// 响应拦截器--成功的回调|失败的回调
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数：服务器数据返回后，被响应拦截器监测，可以处理相应的业务逻辑
    // 进度条结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    // 响应失败的回调：打印错误信息
    return Promise.reject(new Error("faile"));
  }
);

//对外暴露
export default requests;
