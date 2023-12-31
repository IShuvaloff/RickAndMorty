const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/RickAndMorty/' : '/',

  chainWebpack: (config) => {
    config.module.rule('svg-sprite').use('svgo-loader').loader('svgo-loader');
  },
});
