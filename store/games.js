const MUTATIONS = {
  INIT: 'init',
  ORDER_BY_ASC: 'order_by_asc'
}

export const mutations = {
  [MUTATIONS.INIT] (state, payload) {
    state.list = payload
  },
  [MUTATIONS.ORDER_BY_ASC] (state) {
    state.list = state.list.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  }
}

export const state = () => ({
  list: []
})

export const actions = {
  async fetchAll (context) {
    const games = await this.$axios.$get('v1/games')
    context.commit(MUTATIONS.INIT, games)
  }
}
