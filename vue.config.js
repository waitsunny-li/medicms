module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        // 别名配置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://qqq.shihanphp.cn/', // target host
        ws: true, // proxy websockets 
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': '' // rewrite path
        }
      },
    }
  }

}