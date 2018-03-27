const MUTATIONS = {
  UPDATE_USER_TO_VIEW: 'update_user_to_view'
}

export const mutations = {
  [MUTATIONS.UPDATE_USER_TO_VIEW] (state, { user }) {
    state.userToView = user
  }
}

export const state = () => ({
  userToView: null
})

export const getters = {
}

export const actions = {
  async fetchByUsername ({ commit }, { username }) {
    const user = await this.$axios.$get(`/v1/users/${username}`)
    commit(MUTATIONS.UPDATE_USER_TO_VIEW, { user })
  }
}
