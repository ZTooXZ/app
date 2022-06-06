// 封装游客身份模块uuid ----> 生成一个不能改变的随机字符串
import { v4 as uuidv4 } from "uuid";
// 生成一个 不能再更改的随机字符串，游客身份持久存储
export const getUUID = () => {
  // 先判断 本地存储 是否有 uuid
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  // 如果没有
  if (!uuid_token) {
    // 就生成 游客 临时身份
    uuid_token = uuidv4();
    // 本地存储一次
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  return uuid_token;
};
