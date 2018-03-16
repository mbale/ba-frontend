<template>
  <div class="bonus-item">
    <img class="bonus-item__icon" src="~/assets/images/bookmaker/bonus.svg" alt="">
    <h5 class="bonus-item__title">{{ bonus.title }}</h5>
    <code class="bonus-item__code" v-if="bonus.code" >{{ bonus.code }}CODE <span>FREE25</span></code>
    <code class="bonus-item__code" v-else>No Code Required</code>
    <nuxt-link class="bonus-item__button ":to="`/visit/${slug}`">Claim Bonus</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Bonus',
  props: {
    bonus: Object,
    slug: String
  }
}
</script>

<style lang="stylus" scoped>
  .bonus-item
    display: flex
    align-items: center
    justify-content: center
    border-top: 1px solid $color-border
    padding: 20px
    margin: 0 -20px
    &:last-child
      padding-bottom 0

  .bonus-item__icon
    height: 30px
    width: 30px
    margin-right: 15px

  .bonus-item__title
    color: #4d4d4d
    font-size: 20px
    font-weight: bold

  .bonus-item__code
    margin-left: auto
    text-transform: uppercase
    padding: 10px 30px
    border: 1px dashed $color-border
    text-align: center
    background-color: #f9f9f9

  .bonus-item__button
    button($blue)
    padding 10px 30px
    margin-left 15px
</style>
