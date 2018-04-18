const MUTATIONS = {
  SET_PREDICTION: 'set_prediction',
  PREDICTION_POST_ERROR: 'prediction_post_error',
  SET_BOX_STATE: 'set_box_state',
  SET_TEAMS: 'set_teams',
  SET_ODDS: 'set_odds',
  SET_MATCH_ID: 'set_match_id',
  RESET_STATE: 'reset_state'
}

export const mutations = {
  [MUTATIONS.SET_PREDICTION] (state, { prediction }) {
    state.predictionPostInProgress = true
    state.prediction = prediction
  },
  [MUTATIONS.SET_BOX_STATE] (state, { boxState = true }) {
    state.predictionPostInProgress = false
    state.boxState = boxState
  },
  [MUTATIONS.PREDICTION_POST_ERROR] (state, { error, timeout = 3000 }) {
    state.predictionPostInProgress = false
    state.predictionPostError = error

    setTimeout(() => {
      state.predictionPostError = null
    }, timeout)
  },
  [MUTATIONS.SET_TEAMS] (state, { homeTeam = null, awayTeam = null }) {
    state.homeTeam = homeTeam
    state.awayTeam = awayTeam
  },
  [MUTATIONS.SET_ODDS] (state, { oddsId = null, homeOdds = null, awayOdds = null }) {
    state.oddsId = oddsId
    state.homeOdds = homeOdds
    state.awayOdds = awayOdds
  },
  [MUTATIONS.SET_MATCH_ID] (state, { matchId, urlId }) {
    state.matchId = matchId
    state.urlId = urlId
  },
  [MUTATIONS.RESET_STATE] (state) {
    state.boxState = false
    state.homeTeam = null
    state.awayTeam = null
    state.oddsId = null
    state.homeOdds = null
    state.awayOdds = null
    state.matchId = null
  }
}

export const state = () => ({
  boxState: false,
  //
  homeTeam: null,
  awayTeam: null,
  //
  oddsId: null,
  homeOdds: null,
  awayOdds: null,
  matchId: null,
  urlId: null,
  //
  prediction: {
    selectedTeam: null,
    stake: null,
    text: null
  },
  // will contain the error user got during the change
  predictionPostError: null,
  // when everything went successful
  predictionPostSuccess: null,
  // true when in progress, false if not (done), null if wasn't started
  predictionPostInProgress: null
})

export const actions = {
  async postPrediction ({ state, commit }) {
    const {
      matchId,
      oddsId,
      prediction,
      homeTeam
    } = state

    const {
      stake,
      text,
      selectedTeam
    } = prediction

    let team = 'away'

    if (selectedTeam === homeTeam) {
      team = 'home'
    }

    try {
      const payload = {
        stake,
        team,
        oddsId
      }

      if (text) {
        payload.text = text
      }

      await this.$axios.$post(`v1/matches/${matchId}/predictions`, payload)

      commit(MUTATIONS.SET_BOX_STATE, {
        boxState: false
      })
    } catch (error) {
      console.log(error.response.status)
      commit(MUTATIONS.PREDICTION_POST_ERROR, { error: error.response.status })
    }
  }
}
