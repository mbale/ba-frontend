import noAvatarImage from '~/assets/images/no_avatar.png'

const MUTATIONS = {
  UPDATE_LOGGED_USER_DATA: 'update_logged_user_data',
  UPDATE_ACCOUNT_DETAILS: 'update_account_details',
  UPDATE_ACCOUNT_DETAILS_ERROR: 'update_account_details_error',
  UPDATE_ACCOUNT_DETAILS_SUCCESS: 'update_account_details_success'
}

export const mutations = {
  [MUTATIONS.UPDATE_LOGGED_USER_DATA] (state, { profile, prediction }) {
    state.profile = profile
    state.prediction = prediction
  },
  [MUTATIONS.UPDATE_ACCOUNT_DETAILS] (state, { field, value }) {
    state.profileChangeInProgress = true
    if (state.profile[field] !== value) {
      state.profileChanges[field] = value
    } else {
      state.profileChanges[field] = null
    }
  },
  [MUTATIONS.UPDATE_ACCOUNT_DETAILS_ERROR] (state, { error, timeout = 5000 }) {
    state.profileChangeInProgress = false
    state.profileChangeError = error

    setTimeout(() => {
      state.profileChangeError = null
    }, timeout)
  },
  [MUTATIONS.UPDATE_ACCOUNT_DETAILS_SUCCESS] (state, { value, timeout = 3000 }) {
    state.profileChangeInProgress = false
    state.profileChangeSuccess = value

    setTimeout(() => {
      state.profileChangeSuccess = null
    }, timeout)
  }
}

export const getters = {
  // is he logged in?
  isLoggedIn ({ profile }) {
    return !!profile
  },
  defaultAvatar (state, { avatarURL }) {
    return avatarURL === noAvatarImage
  },
  // get back avatar or no avatar image based on actual user
  avatarURL ({ profile }, { isLoggedIn }) {
    if (isLoggedIn) {
      return profile.avatar === '' ? noAvatarImage : profile.avatar
    }
    return null
  },
  // gets back the changes user really made (we parse out null)
  // it's helper for sending data in the best shape to backend
  changedFields ({ profileChanges }) {
    const fieldsObj = {}

    Object.keys(profileChanges)
      .filter(key => profileChanges[key] !== null)
      .forEach(k => {
        fieldsObj[k] = profileChanges[k]
      })

    return fieldsObj
  },
  // shows whether user changed something (not yet on backend)
  // and it's different than the original
  userChangedProfile ({ profileChanges, profile }) {
    return Object.keys(profileChanges)
      .filter((key) => profileChanges[key] !== null)
      .length > 0
  }
}

export const state = () => ({
  // profile & predictions always show the default saved state from backend
  profile: null,
  predictions: null,
  // contains the proposed changes on frontend
  profileChanges: {
    username: null,
    countryCode: null, // not yet active
    password: null,
    email: null,
    avatar: null
  },
  // will contain the error user got during the change
  profileChangeError: null,
  // when everything went successful
  profileChangeSuccess: null,
  // true when in progress, false if not (done), null if wasn't started
  profileChangeInProgress: null
})

export const actions = {
  async getProfile (context) {
    try {
      const {
        profile,
        predictions
      } = await this.$axios.$get('v1/users/me')

      context.commit(MUTATIONS.UPDATE_LOGGED_USER_DATA, { profile, predictions })
    } catch (error) {
      // resetting login
      await context.dispatch('auth/updateToken', {}, {
        root: true
      })
    }
  },
  async editProfile ({ commit, dispatch, getters }) {
    try {
      const { changedFields } = getters

      const pBuffer = []

      // if we need to update avatar too
      // it needs different endpoint
      if (changedFields.avatar) {
        // if it's empty then delete
        const formData = new FormData()

        formData.append('avatar', changedFields.avatar)
        // upload new one
        pBuffer.push(
          this.$axios.$post('v1/users/me/avatar', formData, {
            'content-type': 'multipart/form-data'
          })
        )

        const fieldsToSend = {}

        // checking what field we need to send
        Object.keys(changedFields).forEach(key => {
          // avatar is on different endpoint
          if (key !== 'avatar') {
            fieldsToSend[key] = changedFields[key]
          }
        })

        // if we still need to update other than avatar
        if (Object.keys(fieldsToSend).length > 0) {
          pBuffer.push(
            this.$axios.$put('v1/users/me', fieldsToSend)
          )
        }
      } else {
        pBuffer.push(
          this.$axios.$put('v1/users/me', changedFields)
        )
      }

      await Promise.all(pBuffer)
      // update user state
      await dispatch('getProfile')
      // reset state
      Object.keys(changedFields).forEach(key => {
        commit(MUTATIONS.UPDATE_ACCOUNT_DETAILS, { field: key, value: null })
      })

      // SUCCESS COMMIT
      commit(MUTATIONS.UPDATE_ACCOUNT_DETAILS_SUCCESS, { value: true })
    } catch (error) {
      if (error.response) {
        commit(MUTATIONS.UPDATE_ACCOUNT_DETAILS_ERROR, { error: error.response.status })
      }
    }
  },
  async removeAvatar ({ dispatch }) {
    await this.$axios.$delete('v1/users/me/avatar')
    await dispatch('getProfile')
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
  }
}
