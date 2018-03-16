import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _7540a496 = () => import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */).then(m => m.default || m)
const _5f8c9087 = () => import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages_profile_index" */).then(m => m.default || m)
const _151a56bd = () => import('..\\pages\\matches\\index.vue' /* webpackChunkName: "pages_matches_index" */).then(m => m.default || m)
const _334ade6c = () => import('..\\pages\\bookmakers\\index.vue' /* webpackChunkName: "pages_bookmakers_index" */).then(m => m.default || m)
const _0151c3db = () => import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */).then(m => m.default || m)
const _11e9807e = () => import('..\\pages\\loggedout.vue' /* webpackChunkName: "pages_loggedout" */).then(m => m.default || m)
const _17f245ff = () => import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */).then(m => m.default || m)
const _47136c22 = () => import('..\\pages\\games\\index.vue' /* webpackChunkName: "pages_games_index" */).then(m => m.default || m)
const _3679e1aa = () => import('..\\pages\\legal.vue' /* webpackChunkName: "pages_legal" */).then(m => m.default || m)
const _1aa0ad2c = () => import('..\\pages\\legal\\terms.vue' /* webpackChunkName: "pages_legal_terms" */).then(m => m.default || m)
const _5cdaf2f4 = () => import('..\\pages\\legal\\cookies.vue' /* webpackChunkName: "pages_legal_cookies" */).then(m => m.default || m)
const _1c1faf6d = () => import('..\\pages\\legal\\privacy.vue' /* webpackChunkName: "pages_legal_privacy" */).then(m => m.default || m)
const _1e92f5ed = () => import('..\\pages\\guides\\index.vue' /* webpackChunkName: "pages_guides_index" */).then(m => m.default || m)
const _f01f11a8 = () => import('..\\pages\\guides\\odds-converter.vue' /* webpackChunkName: "pages_guides_odds-converter" */).then(m => m.default || m)
const _49b3733e = () => import('..\\pages\\guides\\betting-glossary.vue' /* webpackChunkName: "pages_guides_betting-glossary" */).then(m => m.default || m)
const _65746cc8 = () => import('..\\pages\\guides\\margin-calculator.vue' /* webpackChunkName: "pages_guides_margin-calculator" */).then(m => m.default || m)
const _0f47a47d = () => import('..\\pages\\matches\\_id\\index.vue' /* webpackChunkName: "pages_matches__id_index" */).then(m => m.default || m)
const _34cc7244 = () => import('..\\pages\\bookmakers\\_slug\\index.vue' /* webpackChunkName: "pages_bookmakers__slug_index" */).then(m => m.default || m)
const _27ec1c0a = () => import('..\\pages\\games\\_slug\\index.vue' /* webpackChunkName: "pages_games__slug_index" */).then(m => m.default || m)
const _665d2786 = () => import('..\\pages\\guides\\_slug\\index.vue' /* webpackChunkName: "pages_guides__slug_index" */).then(m => m.default || m)
const _7ac1f6ba = () => import('..\\pages\\bookmakers\\_slug\\before.vue' /* webpackChunkName: "pages_bookmakers__slug_before" */).then(m => m.default || m)
const _367388a6 = () => import('..\\pages\\matches\\_id\\_slug\\index.vue' /* webpackChunkName: "pages_matches__id__slug_index" */).then(m => m.default || m)
const _37aa20c4 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/signup",
			component: _7540a496,
			name: "signup"
		},
		{
			path: "/profile",
			component: _5f8c9087,
			name: "profile"
		},
		{
			path: "/matches",
			component: _151a56bd,
			name: "matches"
		},
		{
			path: "/bookmakers",
			component: _334ade6c,
			name: "bookmakers"
		},
		{
			path: "/login",
			component: _0151c3db,
			name: "login"
		},
		{
			path: "/loggedout",
			component: _11e9807e,
			name: "loggedout"
		},
		{
			path: "/about",
			component: _17f245ff,
			name: "about"
		},
		{
			path: "/games",
			component: _47136c22,
			name: "games"
		},
		{
			path: "/legal",
			component: _3679e1aa,
			name: "legal",
			children: [
				{
					path: "terms",
					component: _1aa0ad2c,
					name: "legal-terms"
				},
				{
					path: "cookies",
					component: _5cdaf2f4,
					name: "legal-cookies"
				},
				{
					path: "privacy",
					component: _1c1faf6d,
					name: "legal-privacy"
				}
			]
		},
		{
			path: "/guides",
			component: _1e92f5ed,
			name: "guides"
		},
		{
			path: "/guides/odds-converter",
			component: _f01f11a8,
			name: "guides-odds-converter"
		},
		{
			path: "/guides/betting-glossary",
			component: _49b3733e,
			name: "guides-betting-glossary"
		},
		{
			path: "/guides/margin-calculator",
			component: _65746cc8,
			name: "guides-margin-calculator"
		},
		{
			path: "/matches/:id",
			component: _0f47a47d,
			name: "matches-id"
		},
		{
			path: "/bookmakers/:slug",
			component: _34cc7244,
			name: "bookmakers-slug"
		},
		{
			path: "/games/:slug",
			component: _27ec1c0a,
			name: "games-slug"
		},
		{
			path: "/guides/:slug",
			component: _665d2786,
			name: "guides-slug"
		},
		{
			path: "/bookmakers/:slug/before",
			component: _7ac1f6ba,
			name: "bookmakers-slug-before"
		},
		{
			path: "/matches/:id/:slug",
			component: _367388a6,
			name: "matches-id-slug"
		},
		{
			path: "/",
			component: _37aa20c4,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
