<template>
  <div class="content-section">
    <h2 v-if="title" class="content-section__title">{{title}}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    title: String
  }
}
</script>

<style lang="stylus">
// Content Section
.content-section
  color $purplegray
  background-color: #fff
  padding 20px
  &+ .content-section
    margin-top 20px

.content-section__title
  margin-bottom 15px
  font-size 18px
  color #4d4d4d

.content-section__header
  margin -20px
  padding 20px
  
</style>
