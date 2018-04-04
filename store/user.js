import noAvatarImage from '~/assets/images/no_avatar.png'

const MUTATIONS = {
  UPDATE_LOGGED_USER_DATA: 'update_logged_user_data',
  UPDATE_ACCOUNT_DETAILS: 'update_account_details',
  UPDATE_ACCOUNT_DETAILS_ERROR: 'update_account_details_error'
}

export const mutations = {
  [MUTATIONS.UPDATE_LOGGED_USER_DATA] (state, { profile, prediction }) {
    state.profile = profile
    state.prediction = prediction
  },
  [MUTATIONS.UPDATE_ACCOUNT_DETAILS] (state, { field, value }) {
    if (state.profile[field] !== value) {
      state.profileChanges[field] = value
    } else {
      state.profileChanges[field] = null
    }
  }
}

export const getters = {
  // is he logged in?
  isLoggedIn ({ profile }) {
    return !!profile
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
    password: null,
    email: null,
    avatar: null
  },
  // will contain the error user got during the change
  profileChangesError: null,
  //
  changePasswordInProgress: false,
  //
  changeDetailsInProgress: false
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
      await context.dispatch('auth/updateToken', {}, {
        root: true
      })
    }
  },
  async deleteAvatar ({ dispatch }) {
    await this.$axios.$delete('v1/users/me/avatar')
    await dispatch('getProfile')
  },
  async editProfile ({ commit, dispatch, getters }) {
    try {
      const { changedFields } = getters

      const pBuffer = []
      // if we need to update avatar too
      // it needs different endpoint

      console.log(changedFields)

      if (changedFields.avatar) {
        const formData = new FormData()
        formData.append('avatar', changedFields.avatar)

        pBuffer.push(
          this.$axios.$post('v1/users/me/avatar', formData, {
            'content-type': 'multipart/form-data'
          })
        )

        const fieldsToSend = {}

        Object.keys(changedFields).forEach(key => {
          if (key !== 'avatar') {
            fieldsToSend[key] = changedFields[key]
          }
        })

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
      await dispatch('getProfile')
    } catch (error) {
      // defining statusText from error response and changing it.
      const statusText = error.response.statusText
      this.profileChangesError = statusText
    }
  }
}
