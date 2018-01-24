import Cookies from 'js-cookie'
import Cookie from 'cookie'

const MUTATIONS = {
  BASIC: 'basic',
  //
  LOGIN_FAIL: 'login_fail',
  LOGIN_IN_PROGRESS: 'login_in_progress',
  LOGIN_SUCCESS: 'login_success',
  //
  SIGNUP_FAIL: 'signup_fail',
  SIGNUP_IN_PROGRESS: 'signup_in_progress',
  SIGNUP_SUCCESS: 'signup_success',
  //
  GET_PROFILE: 'get_profile',
  SET_TOKEN: 'set_token',
  LOG_OUT: 'log_out'
}

export const mutations = {
  //
  [MUTATIONS.LOGIN_IN_PROGRESS] (state) {
    state.loginInProgress = true
  },
  [MUTATIONS.LOGIN_FAIL] (state, payload) {
    state.loginError = payload.error
    state.loginInProgress = false
  },
  [MUTATIONS.LOGIN_SUCCESS] (state) {
    state.loginError = false
    state.loginInProgress = false
  },
  //
  [MUTATIONS.SIGNUP_IN_PROGRESS] (state) {
    state.signupInProgress = true
  },
  [MUTATIONS.SIGNUP_FAIL] (state, payload) {
    state.signupError = payload.error
    state.signupInProgress = false
  },
  [MUTATIONS.SIGNUP_SUCCESS] (state) {
    state.signupError = false
    state.signupInProgress = false
  },
  //
  [MUTATIONS.SET_TOKEN] (state, payload) {
    state.accessToken = payload.accessToken
  },
  [MUTATIONS.GET_PROFILE] (state, payload) {
    state.user = payload.user
  },
  [MUTATIONS.LOG_OUT] (state) {
    state.user = null
  }
}

export const state = () => ({
  user: null,
  accessToken: null,
  //
  loginInProgress: false,
  loginError: null,
  //
  signupInProgress: false,
  signupError: null
})

export const actions = {
  /*
  **  Signup
  */
  async signup ({ commit, dispatch }, payload) {
    try {
      console.log(payload)
      commit(MUTATIONS.SIGNUP_IN_PROGRESS)

      const {
        accessToken
      } = await this.$axios.$post('v1/users', payload)

      await dispatch('updateToken', {
        accessToken
      })

      commit(MUTATIONS.SIGNUP_SUCCESS)

      await dispatch('getProfile')
    } catch (error) {
      commit(MUTATIONS.SIGNUP_FAIL, {
        error
      })
    }
  },
  /*
  ** Login
  */
  async basic ({ commit, dispatch }, payload) {
    try {
      commit(MUTATIONS.LOGIN_IN_PROGRESS)

      const {
        accessToken
      } = await this.$axios.$post('v1/auth/basic', payload)

      await dispatch('updateToken', {
        accessToken
      })

      commit(MUTATIONS.LOGIN_SUCCESS)

      await dispatch('getProfile')
    } catch (error) {
      commit(MUTATIONS.LOGIN_FAIL, {
        error
      })
    }
  },
  /*
  ** Tokens
  */
  async getToken (context) {
    let accessToken

    // check in what environment we are in
    // prio to localstorage
    if (process.browser && localStorage) {
      accessToken = localStorage.getItem('accessToken')
    }

    // get from cookies
    if (!accessToken) {
      const cookiesString = process.browser ? document.cookie : this.app.context.req.headers.cookie
      const cookiesJSON = Cookie.parse(cookiesString || '') || {}
      accessToken = cookiesJSON.accessToken
    }

    if (accessToken) {
      await context.dispatch('updateToken', {
        accessToken
      })
    }
  },
  async updateToken ({ commit }, payload) {
    const accessToken = payload.accessToken

    // commit to store
    commit(MUTATIONS.SET_TOKEN, {
      accessToken
    })
    // register for axios
    this.$axios.setToken(accessToken, 'Bearer')

    // update localstorage
    if (process.browser && localStorage) {
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
      } else {
        localStorage.removeItem('accessToken')
      }
    }

    // update cookies
    if (process.browser) {
      // browser
      if (accessToken) {
        Cookies.set('accessToken', accessToken)
      } else {
        Cookies.remove('accessToken')
      }
    } else {
      const params = {
        domain: '/'
      }

      if (!accessToken) {
        // make it expire
        const date = new Date()
        const expires = date.setDate(date.getDate() - 1)
        params.expires = expires
      } else {
        const date = new Date()
        params.expires = date.setDate(date.getDate() + 1)
      }

      // issue to server too
      this.app.context.res.setHeader('Set-Cookie', Cookie.serialize('accessToken', accessToken, params))
    }
  },
  /*
  **  Authenticated calls behalf of user
  */
  async getProfile (context) {
    try {
      const user = await this.$axios.$get('v1/users/me')

      context.commit(MUTATIONS.GET_PROFILE, {
        user
      })
    } catch (error) {
      await context.dispatch('updateToken', {})
    }
  },
  async logout ({ commit, dispatch }) {
    await dispatch('updateToken', {})
    commit(MUTATIONS.LOG_OUT)
  }
}
