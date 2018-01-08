const MUTATIONS = {
  BASIC: 'basic',
  FAIL: 'fail',
  IN_PROCESS: 'in_process',
  SUCCESS: 'success',
  GET_PROFILE: 'get_profile',
  INVALID_TOKEN: 'invalid_token'
}

export const mutations = {
  [MUTATIONS.SUCCESS] (state, payload) {
    state.accessToken = payload.accessToken
    state.loginError = false
  },
  [MUTATIONS.IN_PROCESS] (state, payload) {
    state.loginInProcess = payload.state
  },
  [MUTATIONS.FAIL] (state, payload) {
    state.loginError = payload.reason
  },
  [MUTATIONS.GET_PROFILE] (state, payload) {
    state.user = payload.user
  },
  [MUTATIONS.INVALID_TOKEN] (state, payload) {
    state.accessToken = null
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
    } catch (error) {
      context.commit(MUTATIONS.FAIL, {
        reason: error
      })
      context.commit(MUTATIONS.IN_PROCESS, {
        state: false
      })
    }
  },
  async getProfile (context) {
    try {
      this.$axios.setToken(context.state.accessToken, 'Bearer')
      const user = await this.$axios.$get('v1/users/me')

      context.commit(MUTATIONS.GET_PROFILE, {
        user
      })
    } catch (error) {
      context.commit(MUTATIONS.INVALID_TOKEN)
    }
  }
}
