<template>
  <footer class='page-footer'>
    <div class='page-footer__macro grid'>
      <div class='footer-col footer-col--about'>
        <logo class='page-footer__logo'></logo>
        <p class='footer-about'>Betacle lets you find, share and discuss the best esports betting predictions, odds and guides.</p>
      </div>
      <div class='footer-col'>
        <nav class='footer-nav'>
          <h4 class='footer-nav__title'>Betacle</h4>
          <ul class='footer-nav__list'>
            <li class='footer-nav__item'><nuxt-link to='/about' class='footer-nav__link'>About Us</nuxt-link></li>
            <li class='footer-nav__item'><nuxt-link to='/legal/terms' class='footer-nav__link'>Legal</nuxt-link></li>
            <li class='footer-nav__item'><a href='mailto:hello@betacle.com' class='footer-nav__link'>Advertise</a></li>
          </ul>
        </nav>
      </div>
      <div class='footer-col'>
        <nav class='footer-nav'>
          <h4 class='footer-nav__title'>Help</h4>
          <ul class='footer-nav__list'>
            <li class='footer-nav__item'><a href='mailto:hello@betacle.com' class='footer-nav__link'>Contact</a></li>
          </ul>
        </nav>
      </div>
      <div class='footer-col'>
        <nav class='footer-nav'>
          <h4 class='footer-nav__title'>Keep in touch</h4>
          <ul class='footer-nav__list footer-nav__list--socialmedia'>
            <li class='footer-nav__item'>
              <a href='https://www.facebook.com/BetacleEsports' target='_blank' title='Facebook' class='footer-nav__link'>
                <img src='~/assets/images/social/icon_facebook.svg' width='22px' alt='Facebook' />
              </a>
            </li>
            <li class='footer-nav__item'>
              <a href='https://twitter.com/BetacleEsports' target='_blank' rel='noopener noreferrer' title='Twitter' class='footer-nav__link'>
                <img src='~/assets/images/social/icon_twitter.svg' width='22px' alt='Twitter' />
              </a>
            </li>
            <li class='footer-nav__item'>
              <a href='https://discord.gg/2FjBSaf' target='_blank' title='Discord' class='footer-nav__link'>
                <img src='~/assets/images/social/icon_discord.svg' width='22px' alt='Discord' />
              </a>
            </li>
            <li class='footer-nav__item'>
              <a href='https://steamcommunity.com/groups/betacle' target='_blank' title='Steam' class='footer-nav__link'>
                <img src='~/assets/images/social/icon_steam.svg' width='22px' alt='Steam' />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class='page-footer__micro'>
      <p class='page-footer__copyright'>© {{ currentYear }} Betacle. We <s>bet</s> beat esports.</p>
      <p class='page-footer__responsible'>Gamble Responsibly 18+</p>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'
import Logo from '~/components/common/Logo.vue'

export default Vue.extend({
  name: 'FooterBar',
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  components: {
    Logo
  }
})
</script>

<style lang="stylus">
.page-footer
  background-color #fff
  font-size 14px
  line-height 1.5
  color $lgray
  +below(2)
    line-height 1.4

.page-footer__macro
  padding 20px
  display flex
  +below(2)
    display block

.footer-col
  flex 1 0 0
  padding-right 20px
  +below(2)
    text-align center
    margin-bottom 10px
    padding 0
    &:last-child
      margin 0


.footer-col--about
  flex 2 0 0

.footer-about
  +below(2)
    text-align justify

.page-footer__logo
  margin-bottom 10px
  .logo g
    fill: #989898
  +below(2)
    float left
    margin-right 10px

.footer-nav__title
  color $dgray
  font-weight bold
  margin 0 0 10px 0
  +below(2)
    margin-bottom 5px

.footer-nav__list
  clear-list()

.footer-nav__item
  +below(2)
    display inline-block
    margin 0 12px 12px 0
    &:last-child
      margin 0

.footer-nav__link
  display block
  color $lgray
  &:hover
    color $mgray

.footer-nav__list--socialmedia
  overflow hidden
  .footer-nav__item
    vertical-align: top
    display inline-block
    margin-right 12px
    &:last-child
      margin 0
  img
    display block

.page-footer__micro
  border-top 1px solid rgba(151,151,151,.1)
  padding 20px
  clearfix()
  +below(2)
    text-align center
    font-size 12px

.page-footer__copyright
  float left
  margin 0
  +below(2)
    float none

.page-footer__responsible
  float right
  margin 0
  +below(2)
    float none

</style>
