<template>
  <dropdown>
    <dropdown-button class="acc-profile">
      <img :src='avatarURL' class="acc-profile__avatar" />
    </dropdown-button>
    <div slot="content" class="acc-dropdown">
      <nav>
        <nuxt-link class="acc-dropdown__link" :to="{ path: `/users/${username}` }">View Profile</nuxt-link>
        <hr class="acc-dropdown__seperator" />
        <nuxt-link class="acc-dropdown__link" :to="{ path: '/settings' }">Settings</nuxt-link>
        <hr class="acc-dropdown__seperator" />
        <div class="acc-dropdown__link" @click="signout">Logout</div>
      </nav>
    </div>
  </dropdown>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { Dropdown, DropdownButton } from '~/components/common/dropdown'

const { mapState, mapGetters } = createNamespacedHelpers('user')

export default {
  name: 'AccountBlock',
  components: {
    Dropdown, DropdownButton
  },
  computed: {
    ...mapState({
      username: state => state.profile.username
    }),
    ...mapGetters({
      avatarURL: 'avatarURL'
    })
  },
  methods: {
    async signout () {
      await this.$store.dispatch('auth/logout', {})
      this.$router.push('/loggedout')
    },
    async asyncData ({ store, $axios }) {
      await store.dispatch('user/getProfile')
    }
  }
}
</script>

<style lang="stylus">
$link-color = rgba(#fff,.66)
$link-color--hover =  #fff
$link-color--active = #fff

.acc-nav
  padding 15px
  margin-left auto
  position relative
  z-index: 999

.acc-profile
  display inline-block
  display flex
  align-items center
  cursor pointer
  &:after
    content ''
    width 0
    height 0
    border 6px solid transparent
    border-top-width 6px
    border-bottom-width 0
    border-top-color #fff
    transition all .25s
    margin-left 10px

.acc-profile__avatar
  height 30px
  width 30px
  user-select none

.acc-dropdown
  right: 0
  min-width: 150px
  background: $purple
  z-index: 1
  nav
    padding 20px

.acc-dropdown__link
  font-family: $font-dinpro
  font-size: 13px
  text-transform: uppercase
  color $link-color
  font-weight: 500
  user-select none
  display: block
  white-space: nowrap
  cursor: pointer
  &:hover
    color $link-color--hover
  &:active
    color $link-color--active
  & ~ .acc-dropdown__link
    margin-top 15px

.acc-dropdown__seperator
  border: 0
  height 1px
  background: rgba(237,237,237,0.1)
  display: block
  margin: 15px 0

</style>
