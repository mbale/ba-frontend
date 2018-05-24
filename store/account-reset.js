const getDefaultState = () => {
  return {
    token: null,
    password: null,
    errorCode: null,
    success: null
  }
}

const MUTATIONS = {
  SET_DATA: 'set_data',
  SET_RESULT: 'set_result'
}

export const getters = {
  result ({ success, errorCode }) {
    return { success, errorCode }
  }
}

export const mutations = {
  [MUTATIONS.SET_DATA] (state, { token, password }) {
    state.token = token
    state.password = password
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
  async sendPasswordChangeRequest ({ state, commit }, { token, password }) {
    try {
      commit(MUTATIONS.SET_DATA, { token, password })
      await this.$axios.$post('/v1/auth/reset-password', { recoveryToken: token, password })
      commit(MUTATIONS.SET_RESULT, {})
    } catch ({ response }) {
      if (response) {
        const errorCode = response.status
        commit(MUTATIONS.SET_RESULT, { errorCode })
      }
    }
  }
}
