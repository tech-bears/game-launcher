const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: 'http://47.94.9.24:80',
    // changeOrigin: true
  }
})
