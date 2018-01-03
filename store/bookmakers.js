const MUTATIONS = {
  INIT: 'init',
  FILTER_BY_DEPOSIT_METHOD: 'filterByMethod'
}

export const mutations = {
  [MUTATIONS.INIT] (state, payload) {
    state.list = payload
  },
  [MUTATIONS.FILTER_BY_DEPOSIT_METHOD] (state, payload) {
    const method = payload.method
    state.list = state.list.filter(bookmaker => bookmaker.depositMethods.find(m => m.slug === method))
  }
}

export const getters = {
  rankByVotes: (state) => {
    return Object.assign([], state.list).sort((a, b) => b.reviews.avg - a.reviews.avg)
  }
}

export const state = () => ({
  list: [],
  bookmaker: null
})

export const actions = {
  async fetchAll (context) {
    const bookmakers = await this.$axios.$get('v1/bookmakers', {
      params: {
        limit: 100
      }
    })
    context.commit(MUTATIONS.INIT, bookmakers)
  }
}
