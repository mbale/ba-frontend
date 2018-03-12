import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import distance from 'date-fns/distance_in_words'

export default {
  methods: {
    formatDate (date, schema = 'HH:mm') {
      return format(new Date(date), schema)
    },
    sinceInWordsToNow (date, opts) {
      return distanceInWordsToNow(date, opts)
    },
    sinceInWords (date, opts = { includeSeconds: true, addSuffix: true }) {
      return distance(new Date(), date, {
        includeSeconds: true,
        addSuffix: true
      })
    }
  }
}
