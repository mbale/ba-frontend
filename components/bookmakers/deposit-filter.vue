<template>
  <dropdown class='filter-dropdown'>
    <dropdown-button class="filter-dropdown__button">Deposit Methods</dropdown-button>
    <div slot="content" class="filter-dropdown__content">
      <div
        :key="depositMethod.type"
        v-for="depositMethod of depositMethods"
        class="filter-deposit"
        :class="{'is-active': depositMethod.isActive }"
        @click="toggleDepositMethod(depositMethod)">
        <span class="icon">
          <img :class="`image`" :src="depositMethod.imageURL">
        </span>
        <span class="name">{{ depositMethod.name }}</span>
      </div>
    </div>
  </dropdown>
</template>

<script>
import { Dropdown, DropdownButton } from '~/components/common/dropdown'
import BitcoinImage from '~/assets/images/depositmethods/bitcoin.svg'
import CreditCardImage from '~/assets/images/depositmethods/credit-card.svg'
import PaypalImage from '~/assets/images/depositmethods/paypal.svg'
import SkinImage from '~/assets/images/depositmethods/skins.svg'

export default {
  components: {
    Dropdown, DropdownButton
  },
  data () {
    return {
      depositMethods: [
        { type: 'bitcoin', name: 'Bitcoin', imageURL: BitcoinImage },
        { type: 'credit-card', name: 'Credit card', imageURL: CreditCardImage },
        { type: 'paypal', name: 'Paypal', imageURL: PaypalImage },
        { type: 'skin', name: 'Skin', imageURL: SkinImage }
      ]
    }
  },
  methods: {
    toggleDepositMethod (depositMethod) {
      const newRoute = Object.assign({}, this.$route.query, { 'deposit-method': depositMethod.type })
      // console.log('this.$route.query', this.$route.query)
      console.log('route', newRoute)
      this.$router.push({ name: 'bookmakers', query: newRoute })
      this.$store.commit('bookmakers/set_filter', {
        filter: depositMethod.type
      })
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
.filter-deposit
  padding 5px 10px
  cursor pointer
  display block
  white-space nowrap
  .icon
    display inline-block
    height 20px
    width 20px
    margin-right 15px
    border-radius 2px
    background-position center center
    background-repeat no-repeat
    vertical-align middle
  .name
    font-weight bold
    font-size 14px
    user-select none
    color #aaa
  &.is-active
    .icon
      color $blue
    .name
      color $blue

</style>
