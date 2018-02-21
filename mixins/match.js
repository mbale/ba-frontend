import format from 'date-fns/format'

export default {
  methods: {
    getMatchURLPath ({homeTeam, awayTeam, date, id}) {
      return {
        path: `${id}/${this.buildMatchURLSegment(homeTeam, awayTeam)}`
      }
    },
    buildMatchURLSegment (homeTeam, awayTeam) {
      return `${homeTeam.split(' ').join('_')}-${awayTeam.split(' ').join('_')}`
    },
    getLatestOdds (odds) {
      const oddsRanked = Object.assign([], odds).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      if (oddsRanked.length === 0) {
        return false
      }
      return oddsRanked[0]
    },
    formatGroupTimeStamp (date) {
      return format(new Date(date), 'dddd, MMMM D')
    },
    formatMatchDate (date, schema = 'HH:mm') {
      return format(new Date(date), schema)
    }
  }
}
