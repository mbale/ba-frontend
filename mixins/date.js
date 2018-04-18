import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import distance from 'date-fns/distance_in_words'
import { differenceInMonths } from 'date-fns'

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
    },
    differenceInMonths (dateLeft = new Date().setMonth(0), dateRight = new Date()) {
      return differenceInMonths(dateLeft, dateRight)
    }
  }
}
