const MUTATIONS = {
  INIT: 'init',
  GET_BY_SLUG: 'get_by_slug'
}

export const mutations = {
  [MUTATIONS.INIT] (state, payload) {
    state.list = payload
  },
  [MUTATIONS.GET_BY_SLUG] (state, payload) {
    state.guide = payload.guide
  }
}

export const state = () => ({
  list: [],
  guide: null
})

export const actions = {
  async fetchAll (context) {
    const guides = await this.$axios.$get('v1/guides')
    context.commit(MUTATIONS.INIT, guides)
  },
  async getBySlug (context, payload) {
    const slug = payload.slug
    const guide = await this.$axios.$get(`v1/guides/${slug}`)
    context.commit(MUTATIONS.GET_BY_SLUG, {
      guide
    })
  }
}
