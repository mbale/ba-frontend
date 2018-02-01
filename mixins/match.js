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
    getGameBGColor (gameSlug) {
      const game = this.$store.state.games.list.find((game) => game.slug === gameSlug)
      const prop = 'background-color: '

      if (game) {
        return `${prop}${game.color}`
      }

      return `${prop}#1E824C`
    },
    formatGroupTimeStamp (date) {
      return format(new Date(date), 'dddd, MMMM D')
    },
    formatMatchDate (date) {
      return format(new Date(date), 'HH:mm')
    },
    getIconURL (gameSlug) {
      return this.iconURLs[gameSlug]
    }
  }
}
