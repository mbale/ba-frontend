export default {
  methods: {
    buildMatchURLSegment (homeTeam, awayTeam) {
      return `${homeTeam.split(' ').join('_')}-${awayTeam.split(' ').join('_')}`
    }
  }
}
