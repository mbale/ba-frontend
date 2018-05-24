const getDefaultState = () => {
  return {
    email: null,
    success: null,
    errorCode: null
  }
}

const MUTATIONS = {
  SET_EMAIL: 'set_email',
  SET_RESULT: 'set_result',
  RESET_STATE: 'reset_state'
}

export const getters = {
  result ({ success, errorCode }) {
    return { success, errorCode }
  }
}

export const mutations = {
  [MUTATIONS.SET_EMAIL] (state, { email }) {
    state.email = email
  },
  [MUTATIONS.SET_RESULT] (state, { errorCode }) {
    if (errorCode) {
      state.success = false
      state.errorCode = errorCode
    } else {
      state.success = true
    }
  }
}

export const state = () => getDefaultState()

export const actions = {
  async sendRecoverRequest ({ state, commit }, { email }) {
    try {
      commit(MUTATIONS.SET_EMAIL, { email })
      await this.$axios.$post('/v1/auth/forgot-password', { email })
      commit(MUTATIONS.SET_RESULT, {})
    } catch ({ response }) {
      if (response) {
        const errorCode = response.status
        commit(MUTATIONS.SET_RESULT, { errorCode })
      }
    }
  }
}
