const webpack = require('webpack')
const rupture = require('rupture')
const dotenv = require('dotenv')
const nodeExternals = require('webpack-node-externals')

dotenv.config()

const BACKEND_URL = process.env.BACKEND_URL

process.env.DEBUG = 'nuxt:*'

module.exports = {
  debug: true,
  // needs to sync cookie & jwt token on client site
  router: {
    middleware: ['sync-auth-ssr-client']
  },
  // due to bug
  modulesDir: ['node_modules'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  // Vue
  plugins: [
    {
      src: '~/plugins/axios',
      ssr: true
    },
    {
      src: '~/plugins/pretty-checkbox-vue',
      ssr: true
    },
    {
      src: '~/plugins/vue-social-share',
      ssr: true
    }, {
      src: '~/plugins/vee-validate',
      ssr: true
    }, {
      src: '~/plugins/vue-star-rating',
      ssr: false
    }, {
      src: '~/plugins/vue-awesome',
      ssr: true
    }, {
      src: '~/plugins/vue-paginate',
      ssr: true
    }, {
      src: '~/plugins/vue-numeric',
      ssr: true
    }
  ],
  axios: {
    proxy: true,
    prefix: '/api',
    credentials: true
  },
  proxy: [
    ['/api', { target: BACKEND_URL, pathRewrite: { '^/api': '' } }]
  ],
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
      'vue-flag-icon',
      'vue-social-sharing',
      'vue-star-rating',
      'vee-validate',
      'vue-awesome',
      'vuex-persistedstate',
      'vuejs-paginate',
      'vue-numeric',
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
              '~assets/styles/utilities/settings.styl',
              '~assets/styles/utilities/mixins.styl'
            ], // globals
            use: [rupture()] // additional plugins
          }
        }
      })
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/main.styl'
  ]
}
