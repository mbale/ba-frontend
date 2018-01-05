const MUTATIONS = {
  BASIC: 'basic',
  FAIL: 'fail',
  IN_PROCESS: 'in_process'
}

export const mutations = {
  [MUTATIONS.BASIC] (state, payload) {
    state.accessToken = payload.accessToken
  },
  [MUTATIONS.IN_PROCESS] (state) {
    state.loginInProcess = true
  },
  [MUTATIONS.FAIL] (state, payload) {
    state.authenticationFail = payload.reason
  }
}

export const state = () => ({
  user: null,
  loginInProcess: false,
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

      context.commit(MUTATIONS.BASIC, {
        accessToken
      })
    } catch (error) {
      context.commit(MUTATIONS.FAIL, {
        reason: error
      })
    }
  }
}
