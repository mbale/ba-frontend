const MUTATIONS = {
  SET_PREDICTION: 'set_prediction',
  SET_BOX_STATE: 'set_box_state',
  SET_TEAMS: 'set_teams',
  SET_ODDS: 'set_odds',
  SET_MATCH_ID: 'set_match_id'
}

export const mutations = {
  [MUTATIONS.SET_PREDICTION] (state, { prediction }) {
    state.prediction = prediction
  },
  [MUTATIONS.SET_BOX_STATE] (state, { boxState = true }) {
    state.boxState = boxState
  },
  [MUTATIONS.SET_TEAMS] (state, { homeTeam, awayTeam }) {
    state.homeTeam = homeTeam
    state.awayTeam = awayTeam
  },
  [MUTATIONS.SET_ODDS] (state, { oddsId, homeOdds, awayOdds }) {
    state.oddsId = oddsId
    state.homeOdds = homeOdds
    state.awayOdds = awayOdds
  },
  [MUTATIONS.SET_MATCH_ID] (state, { matchId }) {
    state.matchId = matchId
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
  //
  prediction: {
    selectedTeam: null,
    stake: null,
    text: null
  }
})

export const actions = {
  async postPrediction ({ state, commit }) {
    const {
      matchId,
      oddsId,
      prediction
    } = state

    const {
      stake,
      text,
      selectedTeam
    } = prediction

    try {
      await this.$axios.$post(`v1/matches/${matchId}/predictions`, {
        stake,
        text,
        team: selectedTeam,
        oddsId
      })

      commit(MUTATIONS.SET_BOX_STATE, {
        boxState: false
      })
    } catch (error) {
      console.log(error)
    }
  }
}
