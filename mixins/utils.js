import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

export default {
  methods: {
    formatDate (date, schema = 'HH:mm') {
      return format(new Date(date), schema)
    },
    sinceDate (date, opts) {
      return distanceInWordsToNow(date, opts)
    }
  }
}
