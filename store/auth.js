const MUTATIONS = {
  BASIC: 'basic',
  FAIL: 'fail',
  IN_PROCESS: 'in_process',
  SUCCESS: 'success',
  GET_PROFILE: 'get_profile'
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
    // try {
    //   const user = await this.$axios.$post('v1/user/me')
    // } catch (error) {

    // }
  }
}
