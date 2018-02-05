const MUTATIONS = {
  SET_PREDICTION: 'set_prediction',
  TOGGLE_BOX: 'toggle_box'
}

export const mutations = {
  [MUTATIONS.SET_PREDICTION] (state, payload) {
    state.prediction = payload.prediction
    state.teams = payload.teams
  },
  [MUTATIONS.TOGGLE_BOX] (state, payload) {
    state.boxActive = payload.state
  }
}

export const state = () => ({
  boxActive: true,
  teams: [],
  prediction: {
    selectedTeam: null,
    oddsId: null,
    stake: null,
    text: null
  }
})

export const actions = {
  async postPrediction () {

  }
}
