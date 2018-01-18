const MUTATIONS = {
  UPDATE_LIST: 'update_list',
  SET_FILTER: 'set_filter',
  FILTER_BY_DEPOSIT_METHOD: 'filter_by_method'
}

export const mutations = {
  [MUTATIONS.UPDATE_LIST] (state, payload) {
    state.list = payload.bookmakers
  },
  [MUTATIONS.SET_FILTER] (state, payload) {
    state.filter = payload.filter ? payload.filter : null
  }
}

export const getters = {
  rankByVotes: (state) => {
    return Object.assign([], state.list).sort((a, b) => b.reviews.avg - a.reviews.avg)
  },
  getByFilter: (state, { rankByVotes }) => {
    const filter = state.filter

    if (filter) {
      return Object.assign([], rankByVotes).filter(bookmaker => bookmaker.depositMethods.find(m => m.slug === filter))
    }
    return rankByVotes
  }
}

export const state = () => ({
  list: [],
  filter: null,
  bookmaker: null
})

export const actions = {
  async fetchAll (context) {
    const bookmakers = await this.$axios.$get('v1/bookmakers', {
      params: {
        limit: 100
      }
    })
    context.commit(MUTATIONS.UPDATE_LIST, { bookmakers })
  }
}
