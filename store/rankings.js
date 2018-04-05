// import format from 'date-fns/format'

const MUTATIONS = {
  UPDATE_RANKINGS_LIST: 'update_rankings_list',
  UPDATE_SORT_BY: 'update_sort_by',
  UPDATE_MONTH_FILTER: 'update_month_filter'
}

export const mutations = {
  [MUTATIONS.UPDATE_RANKINGS_LIST] (state, { rankings }) {
    state.rankings = rankings
  },
  [MUTATIONS.UPDATE_SORT_BY] (state, { field = 'profit', order = 'desc' }) {
    state.field = field
    state.order = order
  },
  [MUTATIONS.UPDATE_MONTH_FILTER] (state, { slug, value }) {
    const filterToToggle = state.monthFilter.find(filter => filter.slug === slug)
    state.monthFilter.filter((filter) => { filter.active = false }) // <- lol, this solves the "Arrow should not return assignment function". And lets to select only 1 month.

    state.selectedMonthNumber = filterToToggle.monthNumber // changing selected month number
    filterToToggle.active = value
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
  },

  // get filters we allowed to show in filter
  monthsFiltersToShow ({ monthFilter }) {
    return monthFilter.filter(filter => filter.hidden)
  },
  // // get filters user allowed to query by
  activeMonthFilters (state, { monthsFiltersToShow }) {
    return monthsFiltersToShow.filter(filter => filter.active)
  }
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
const d = new Date()

export const state = () => ({
  // shows the month we query rankings by
  // backend is not ok with default date() indexing
  selectedMonthNumber: null,
  currentMonthNumber: d.getMonth(),
  monthFilter: [
    { slug: 'prevPrevMonth', name: monthNames[d.getMonth() - 2], monthNumber: d.getMonth() - 2, hidden: true, active: false },
    { slug: 'prevMonth', name: monthNames[d.getMonth() - 1], monthNumber: d.getMonth() - 1, hidden: true, active: false },
    { slug: 'currentMonth', name: monthNames[d.getMonth()], monthNumber: d.getMonth(), hidden: true, active: true }
  ],
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
      currentMonthNumber,
      selectedMonthNumber
    } = state

    const params = {
      month: selectedMonthNumber === null ? currentMonthNumber + 1 : selectedMonthNumber + 1
    }

    const rankings = await this.$axios.$get('/v1/ranking', {
      params
    })

    console.log(rankings)

    commit(MUTATIONS.UPDATE_RANKINGS_LIST, { rankings })
  }
}
