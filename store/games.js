const MUTATIONS = {
  INIT: 'init',
  GET_BY_SLUG: 'get_by_slug',
  ORDER_BY_ASC: 'order_by_asc'
}

export const mutations = {
  [MUTATIONS.INIT] (state, payload) {
    state.list = payload
  },
  [MUTATIONS.GET_BY_SLUG] (state, payload) {
    state.game = payload.game
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
  list: [],
  game: ''
})

export const actions = {
  async fetchAll (context) {
    const games = await this.$axios.$get('v1/games')
    context.commit(MUTATIONS.INIT, games)
  },
  async getBySlug (context, payload) {
    const slug = payload.slug
    const game = await this.$axios.$get(`v1/games/${slug}`)
    context.commit(MUTATIONS.GET_BY_SLUG, {
      game
    })
  }
}
