const webpack = require('webpack')
const rupture = require('rupture')
const dotenv = require('dotenv')
const nodeExternals = require('webpack-node-externals')

dotenv.config()

const BACKEND_URL = process.env.BACKEND_URL
const FRONTEND_URL = process.env.FRONTEND_URL
const GA_ID = process.env.GA_ID

process.env.DEBUG = 'nuxt:*'

module.exports = {
  debug: true,
  env: {
    FRONTEND_URL
  },
  // needs to sync cookie & jwt token on client site
  // runs on all route
  router: {
    middleware: ['sync-auth-ssr-client']
  },
  // contains only serverside running middlewares
  serverMiddleware: [
    {
      path: '/auth/steam/redirect',
      handler: '~/middleware/steam-provider.js'
    }
  ],
  // due to bug we need to refer to packages folder
  modulesDir: ['node_modules'],
  // nuxtjs related modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/google-analytics'
  ],
  // Vue Plugins
  // When you add vue related plugin, it should be noted here
  plugins: [
    {
      src: '~/plugins/vue-croppa',
      ssr: true
    },
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
    },
    {
      src: '~/plugins/vee-validate',
      ssr: true
    },
    {
      // TODO upgrade to ssr version when plugin is updated and finally not referencing to document dom
      // or we could just tell webpack how should handle such cases
      src: '~/plugins/vue-star-rating',
      ssr: false
    },
    {
      src: '~/plugins/vue-awesome',
      ssr: true
    },
    {
      src: '~/plugins/vue-paginate',
      ssr: true
    },
    {
      src: '~/plugins/vue-numeric',
      ssr: true
    }
  ],
  /*
  **  Plugin options for each
  */
  // nuxt ga
  'google-analytics': {
    id: GA_ID
  },
  // nuxtjs-axios
  axios: {
    // needs to be true othwerwise won't get redirected to proxy with correct headers
    proxy: true,
    // by default it's empty
    prefix: '/api',
    // cors e.g Access-Control-Allow-Origin
    credentials: false
  },
  // nuxtjs-proxy
  proxy: [
    // urls starting with path will be redirected to backend without api segment in url
    ['/api', { target: BACKEND_URL, pathRewrite: { '^/api': '' } }]
  ],
  // vue-head
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
  ** Webpack Build configuration
  */
  build: {
    extend (config, ctx) {
      // on client side, webpack won't help these libraries
      // so we need to tell it how to handle it
      // it was needed due to node-openid (which can be only servermiddleware)
      if (ctx.isClient) {
        // during client building webpack won't result these
        config.node = {
          fs: 'empty',
          net: 'empty',
          tls: 'empty'
        }
      }

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
    /*
    ** Webpack vendor
    */
    // helps webpack to not include everything multiple times
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
      // in case of packages with dynamic requires
      // TODO: when nuxtjs is upgraded to webpack 4, we can remove this
      // new webpack.IgnorePlugin(/har-validator|keyv/),
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
