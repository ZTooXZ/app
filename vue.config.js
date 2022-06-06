/* 配置代理 */
module.exports = {
  //关闭eslint
  lintOnSave:false,
  devServer: {
    proxy: {
      // 可以认为是请求 代理服务器转发请求 的标识
      '/api': {
        // 要获取数据的 服务器 Ip地址
        target: 'http://gmall-h5-api.atguigu.cn',
        /*路径重新   
        pathRewrite: { '^/api': '' }, */
      },
    },
  },
}