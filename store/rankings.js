const MUTATIONS = {
  UPDATE_RANKINGS_LIST: 'update_rankings_list',
  UPDATE_MONTH_FILTER: 'update_month_filter',
  UPDATE_SORT_BY: 'update_sort_by'
}

export const mutations = {
  [MUTATIONS.UPDATE_RANKINGS_LIST] (state, { rankings }) {
    state.rankings = rankings
  },
  [MUTATIONS.UPDATE_MONTH_FILTER] (state, { month }) {
    state.monthFilter = month
  },
  [MUTATIONS.UPDATE_SORT_BY] (state, { field = 'profit', order = 'desc' }) {
    state.field = field
    state.order = order
  }
}

export const getters = {
  // get sorted rankings by store defined field, ordering
  sortedRankings ({ rankings, sortBy }) {
    const { field, order } = sortBy
    const sortComparator = (a, b) => {
      if (order === 'asc') {
        return a.stats[field] - b.stats[field]
      }
      return b.stats[field] - a.stats[field]
    }
    return rankings.sort(sortComparator)
  }
}

export const state = () => ({
  // shows the month we query rankings by
  // backend is not ok with default date() indexing
  monthFilter: new Date().getMonth() + 1,
  sortBy: {
    field: 'profit',
    order: 'desc'
  },
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
