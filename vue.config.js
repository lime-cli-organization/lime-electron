const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/authorize': {
        target: 'http://114.55.115.86:8052/api/authorize',
        changeOrigin: true,
        pathRewrite: {
          '^/authorize': '',
        },
      },
      '/api': {
        target: 'http://114.55.115.86:8051/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
});
