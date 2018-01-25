const webpack = require('webpack')
const rupture = require('rupture')
const dotenv = require('dotenv')
const nodeExternals = require('webpack-node-externals')

dotenv.config()

const BACKEND_URL = process.env.BACKEND_URL
const FRONTEND_URL = process.env.FRONTEND_URL

module.exports = {
  // Vue
  plugins: [{
    src: '~/plugins/vue-social-share',
    ssr: true
  }, {
    src: '~/plugins/vee-validate',
    ssr: true
  }, {
    src: '~/plugins/vue-star-rating',
    ssr: true
  }, {
    src: '~/plugins/vue-awesome',
    ssr: true
  }, {
    src: '~/plugins/sync-auth-ssr-client',
    ssr: true
  }],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    // baseURL: `0.0.0.0:3010`,
    credentials: false
  },
  proxy: [
    ['/api', { target: BACKEND_URL, pathRewrite: { '^/api': '' } }]
  ],
  // due to bug
  modulesDir: ['node_modules'],
  /*
  ** Headers of the page
  */
  head: {
    title: 'Betacle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#ffffff' },
  /*
  ** Build configuration
  */
  build: {
    extend (config, ctx) {
      /*
      ** Eslint on save
      */
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      /*
      ** ServerSide bundling
      */
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            // default value for `whitelist` is
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/]
          })
        ]
      }
    },
    vendor: [
      'vue-social-sharing',
      'vue-star-rating',
      'vee-validate',
      'vue-awesome',
      'vuex-persistedstate',
      'oddslib'
    ],
    /*
    ** Webpack plugins
    */
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          // stylus
          stylus: {
            preferPathResolver: 'webpack', // otherwise it would use his own resolve mechanism (without alias)
            import: [
              '~assets/style/fonts.styl',
              '~assets/style/mixins.styl',
              '~assets/style/settings.styl'
            ], // globals
            use: [rupture()] // additional plugins
          }
        }
      })
    ]
  }
}
