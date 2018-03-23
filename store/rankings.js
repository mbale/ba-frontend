const MUTATIONS = {
  UPDATE_RANKINGS_LIST: 'update_rankings_list',
  UPDATE_MONTH_FILTER: 'update_month_filter'
}

export const mutations = {
  [MUTATIONS.UPDATE_RANKINGS_LIST] (state, { rankings }) {
    state.rankings = rankings
  },
  [MUTATIONS.UPDATE_MONTH_FILTER] (state, { month }) {
    state.monthFilter = month
  }
}

export const state = () => ({
  // shows the month we query rankings by
  // backend is not ok with default date() indexing
  monthFilter: new Date().getMonth() + 1,
  // contains the actual list of rankings
  rankings: []
})

export const actions = {
  async fetch ({ commit, state }) {
    const {
      monthFilter
    } = state

    const params = {
      month: monthFilter
    }

    const rankings = await this.$axios.$get('/v1/ranking', {
      params
    })

    commit(MUTATIONS.UPDATE_RANKINGS_LIST, { rankings })
  }
}
