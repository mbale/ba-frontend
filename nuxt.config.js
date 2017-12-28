const webpack = require('webpack')
const rupture = require('rupture')
const dotenv = require('dotenv')

dotenv.config()

const BACKEND_URL = process.env.BACKEND_URL

module.exports = {
  // Vue
  plugins: [{
    src: '~/plugins/vue-social-share',
    ssr: true
  }],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: BACKEND_URL,
    credentials: false
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'ba-frontend-vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extend (config, ctx) {
      /*
      ** Eslint on save
      */
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'vue-social-sharing',
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
