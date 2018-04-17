const MUTATIONS = {
  UPDATE_USER_INFO: 'update_user_info',
  UPDATE_PAGE: 'update_page'
}

export const mutations = {
  [MUTATIONS.UPDATE_PAGE] (state, { page }) {
    state.page = page

    if (state.lastPage < page) {
      state.lastPage = page
      state.lastPredictionsToShow += state.predictionsPerPage
    } else if (state.lastPage > page) {
      state.lastPage = page
      state.lastPredictionsToShow -= state.predictionsPerPage
    }
  },
  [MUTATIONS.UPDATE_USER_INFO] (state, { user }) {
    state.userToView = user
    state.userPredictions = user.predictions.reverse()
  }
}

export const state = () => ({
  userToView: null,
  //
  userPredictions: [],
  slicedPredictionsShow: [],
  lastPredictionsToShow: 0,
  predictionsPerPage: 20,
  lastPage: 1,
  page: 0
})

export const getters = {
  predictionsToShow ({ userPredictions, lastPredictionsToShow, predictionsPerPage }) {
    const slicedPredictions = userPredictions.slice(lastPredictionsToShow, lastPredictionsToShow + predictionsPerPage)
    state.slicedPredictionsShow = slicedPredictions // changing variable
    return slicedPredictions
  }
}

export const actions = {
  async fetchByUsername ({ commit }, { username }) {
    const user = await this.$axios.$get(`/v1/users/${username}`)
    commit(MUTATIONS.UPDATE_USER_INFO, { user })
  }
}
