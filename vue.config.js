module.exports = {
  // 开发模式(./),测试模式 (/)
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
