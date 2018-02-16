<template>
  <div class="panel">
    <div class="row" v-bind:key="prediction.id" v-for="prediction of predictions">
      <div class="user">
        {{ getUser(prediction).username }}
      </div>
      <div class="prediction">
        <span class="text">{{ prediction.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PredictionList',
  computed: {
    predictions () {
      return this.$store.state.match.data.predictions
    }
  },
  methods: {
    getUser (prediction) {
      return prediction.user
    }
  }
}
</script>

<style lang="stylus">

</style>
