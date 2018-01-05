const MUTATIONS = {
  AUTHENTICATION: 'authentication'
}

export const mutations = {
  [MUTATIONS.AUTHENTICATION] (state, payload) {
    state.user = payload
  }
}

export const state = () => ({
  user: null
})

export const actions = {
  async basic (context, {
    username,
    password
  }) {
    // const {
    //   data
    // } = await this.$axios.$post('v1/auth/basic', {
    //   username,
    //   password
    // })
    context.commit(MUTATIONS.AUTHENTICATION, {
      username,
      password
    })
  }
}
