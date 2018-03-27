const MUTATIONS = {
  SET_DATA: 'set_data',
  RESET_DATA: 'reset_data',
  //
  CHANGE_PASSWORD_FAIL: 'change_password_fail',
  CHANGE_PASSWORD_IN_PROGRESS: 'change_password_in_progress',
  CHANGE_PASSWORD_SUCCESS: 'change_password_success',
  //
  CHANGE_EMAIL_FAIL: 'change_email_fail',
  CHANGE_EMAIL_IN_PROGRESS: 'change_email_in_progress',
  CHANGE_EMAIL_SUCCESS: 'change_email_success',
  //
  CHANGE_USERNAME_FAIL: 'change_username_fail',
  CHANGE_USERNAME_IN_PROGRESS: 'change_username_in_progress',
  CHANGE_USERNAME_SUCCESS: 'change_username_success'
}

export const mutations = {
  //
  [MUTATIONS.SET_DATA] (state, { profile, predictions }) {
    state.profile = profile
    state.predictions = predictions
  },
  [MUTATIONS.RESET_DATA] (state) {
    state.profile = null
    state.predictions = null
  },
  // PASSWORD
  [MUTATIONS.CHANGE_PASSWORD_IN_PROGRESS] (state) {
    state.changePasswordInProgress = true
  },
  [MUTATIONS.CHANGE_PASSWORD_FAIL] (state, payload) {
    state.changePasswordError = payload.error
    state.changePasswordInProgress = false
  },
  [MUTATIONS.CHANGE_PASSWORD_SUCCESS] (state) {
    state.changePasswordError = false
    state.changePasswordInProgress = false
  },
  // EMAIL
  [MUTATIONS.CHANGE_EMAIL_IN_PROGRESS] (state) {
    state.changeEmailInProgress = true
  },
  [MUTATIONS.CHANGE_EMAIL_FAIL] (state, payload) {
    state.changeEmailError = payload.error
    state.changeEmailInProgress = false
  },
  [MUTATIONS.CHANGE_EMAIL_SUCCESS] (state) {
    state.changeEmailError = false
    state.changeEmailInProgress = false
  },
  // USERNAME
  [MUTATIONS.CHANGE_USERNAME_IN_PROGRESS] (state) {
    state.changeUsernameInProgress = true
  },
  [MUTATIONS.CHANGE_USERNAME_FAIL] (state, payload) {
    state.changeUsernameError = payload.error
    state.changeUsernameInProgress = false
  },
  [MUTATIONS.CHANGE_USERNAME_SUCCESS] (state) {
    state.changeUsernameError = false
    state.changeUsernameInProgress = false
  },
  //
  [MUTATIONS.SET_TOKEN] (state, payload) {
    state.accessToken = payload.accessToken
  }
}

export const getters = {
  isLoggedIn ({ profile }) {
    return !!profile
  }
}

export const state = () => ({
  profile: null,
  predictions: null,
  // user: null,
  // accessToken: null,
  //
  changePasswordInProgress: false,
  changePasswordError: null,
  //
  changeEmailInProgress: false,
  changeEmailError: null,
  //
  changeUsernameInProgress: false,
  changeUsernameError: null
})

export const actions = {
  async getProfile (context) {
    try {
      const {
        profile,
        predictions
      } = await this.$axios.$get('v1/users/me')

      context.commit('user/set_data', {
        profile,
        predictions
      }, { root: true })
    } catch (error) {
      await context.dispatch('auth/updateToken', {}, {
        root: true
      })
    }
  },
  /*
  **  Change Password
  */
  async changePassword ({ commit, dispatch }, payload) {
    try {
      commit(MUTATIONS.CHANGE_PASSWORD_IN_PROGRESS)

      await this.$axios.$put('v1/users/me', payload)

      commit(MUTATIONS.CHANGE_PASSWORD_SUCCESS)
    } catch (error) {
      commit(MUTATIONS.CHANGE_PASSWORD_FAIL, {
        error
      })
    }
  },
  /*
  **  Change Username
  */
  async changeUsername ({ commit, dispatch }, payload) {
    try {
      console.log(payload)
      commit(MUTATIONS.CHANGE_USERNAME_IN_PROGRESS)

      await this.$axios.$put('v1/users/me', payload)

      commit(MUTATIONS.CHANGE_USERNAME_SUCCESS)
    } catch (error) {
      commit(MUTATIONS.CHANGE_USERNAME_FAIL, {
        error
      })
    }
  },
  /*
  **  Change Email
  */
  async changeEmail ({ commit, dispatch }, payload) {
    try {
      console.log(payload)
      commit(MUTATIONS.CHANGE_EMAIL_IN_PROGRESS)

      await this.$axios.$put('v1/users/me', payload)

      commit(MUTATIONS.CHANGE_EMAIL_SUCCESS)
    } catch (error) {
      commit(MUTATIONS.CHANGE_EMAIL_FAIL, {
        error
      })
    }
  }
}
