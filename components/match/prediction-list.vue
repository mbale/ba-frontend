<template>
  <div class="panel">
    <div class="row" v-bind:key="prediction.id" v-for="prediction of predictions">
      {{ prediction.text }}
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
  }
}
</script>

<style lang="stylus">

</style>
