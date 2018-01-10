import Cookies from 'js-cookie'
import Cookie from 'cookie'

const MUTATIONS = {
  BASIC: 'basic',
  FAIL: 'fail',
  IN_PROCESS: 'in_process',
  SUCCESS: 'success',
  GET_PROFILE: 'get_profile',
  SET_TOKEN: 'set_token',
  LOG_OUT: 'log_out'
}

export const mutations = {
  [MUTATIONS.SUCCESS] (state, payload) {
    state.accessToken = payload.accessToken
    state.loginError = false
  },
  [MUTATIONS.IN_PROCESS] (state, payload) {
    state.loginInProcess = payload.state
  },
  [MUTATIONS.SET_TOKEN] (state, payload) {
    state.accessToken = payload.accessToken
  },
  [MUTATIONS.FAIL] (state, payload) {
    state.loginError = payload.reason
  },
  [MUTATIONS.GET_PROFILE] (state, payload) {
    state.user = payload.user
  },
  [MUTATIONS.LOG_OUT] (state, payload) {
    state.user = null
  }
}

export const state = () => ({
  user: null,
  loginInProcess: false,
  loginError: null,
  accessToken: null
})

export const actions = {
  async basic (context, {
    username,
    password
  }) {
    try {
      const {
        accessToken
      } = await this.$axios.$post('v1/auth/basic', {
        username,
        password
      })

      context.commit(MUTATIONS.SUCCESS, {
        accessToken
      })

      context.commit(MUTATIONS.IN_PROCESS, {
        state: false
      })

      await context.dispatch('updateToken', {
        accessToken
      })
    } catch (error) {
      context.commit(MUTATIONS.FAIL, {
        reason: error
      })
      context.commit(MUTATIONS.IN_PROCESS, {
        state: false
      })
    }
  },
  // Get token from localstorage or cookie
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
  // Updates token both in store and in localstorage or cookies
  async updateToken (context, payload) {
    const accessToken = payload.accessToken

    // commit to store
    context.commit(MUTATIONS.SET_TOKEN, {
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
      }

      // issue to server too
      this.app.context.res.setHeader('Set-Cookie', Cookie.serialize('accessToken', accessToken, params))
    }
  },
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
  async logout (context) {
    await context.dispatch('updateToken', {})
    context.commit(MUTATIONS.LOG_OUT)
  }
}
