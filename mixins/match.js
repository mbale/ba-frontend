import csgoIconURL from '~/assets/images/games/icons/csgo.svg'
import dota2IconURL from '~/assets/images/games/icons/dota-2.svg'
import hearthStoneIconURL from '~/assets/images/games/icons/hearthstone.svg'
import hotsIConURL from '~/assets/images/games/icons/heroes-of-the-storm.svg'
import lolIconURL from '~/assets/images/games/icons/lol.svg'
import owIconURL from '~/assets/images/games/icons/ow.svg'
import rlIconURL from '~/assets/images/games/icons/rocket-league.svg'
import sc2IconURL from '~/assets/images/games/icons/starcraft-2.svg'
import format from 'date-fns/format'

export default {
  data () {
    return {
      iconURLs: {
        csgo: csgoIconURL,
        'dota-2': dota2IconURL,
        'hearthstone': hearthStoneIconURL,
        'heroes-of-the-storm': hotsIConURL,
        lol: lolIconURL,
        ow: owIconURL,
        'rocket-league': rlIconURL,
        'starcraft-2': sc2IconURL
      }
    }
  },
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
