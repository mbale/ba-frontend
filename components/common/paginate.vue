<template>
  <div class="paginate">
    <paginate
      :page-count="pageCount"
      :click-handler="changePage"
      :container-class="'pagination'"
      :page-class="'pagination__item'"
      :prev-class="'pagination__item pagination__item--arrow'"
      :next-class="'pagination__item pagination__item--arrow'"
      :page-link-class="'item-link'"
      :active-class="'pagination__item--active'"
      :disabled-class="'pagination__item--disabled'"
    >
      <span slot="prevContent"><icon name="angle-left" scale="1.5" /></span>
      <span slot="nextContent"><icon name="angle-right" scale="1.5" /></span>
    </paginate>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/angle-left'
import 'vue-awesome/icons/angle-right'

export default {
  components: {
    Icon
  },
  props: {
    pageCount: {
      type: Number,
      required: true
    },
    changePage: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="stylus">
.pagination
  display flex
  flex-direction row
  flex-wrap wrap
  background-color #fff
  border-radius 2px
  list-style none
  user-select none
  padding 5px

.pagination__item
  display inline-flex
  justify-content center
  align-items center
  margin 0 6px
  padding 2px 5px
  a
    color $lgray
    &:hover
      color $mgray
    &:active
      color $mgray

.pagination__item--active
  background-color $blue
  color white
  font-weight 600
  border-radius 4px
  padding 0px 12px
  a
    color #fff

.pagination__item--disabled
  a
    color $lgray
    cursor default

.pagination__item--arrow
  a
    color $blue
  &:first-child
    padding 0 15px 0 0
    border-right 1px solid #dbdbdb
  &:last-child
    padding 0 0 0 15px
    border-left 1px solid #dbdbdb
</style>
