<template>
  <section class="betting-terms">
    <h1 class="betting-terms__header">Betting Terms</h1>
    <section class="betting-terms__intro">
      <p class="text">
        There are a lot of betting terms used in esports betting which can be difficult to understand for new players.
        <br />Below you will find a comprehensive betting glossary with the most important terms, from game specific words to general betting concepts, that you can refer to whenever you see an unfamiliar word or phrase.
        <br />If you come across a term that isn’t in our betting glossary yet, feel free to <a href='mailto:hello@betacle.com'>contact us</a> and we’ll add it along with a clear definition.
      </p>
    </section>
    <section class="betting-terms__group">
      <glossary-box :words="getWords(term)" v-bind:key="term.$index" v-for="term in terms"></glossary-box>
    </section>
    <section class="betting-terms__list">
      <glossary-row :term="term" v-bind:key="term.$index" v-for="term in terms"></glossary-row>
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import GlossaryBox from '~/components/guides/GlossaryBox'
import GlossaryRow from '~/components/guides/GlossaryRow'

export default Vue.extend({
  name: 'BettingTerms',
  components: {
    GlossaryBox,
    GlossaryRow
  },
  methods: {
    getWords (terms) {
      const words = Object.keys(terms)
      return words
    }
  },
  data () {
    return {
      terms: [
        {
          'Accumulator': 'A bet where you combine multiple individual bets on different events. All of your bets must win in order for the bet to pay out. If just one bet doesn’t win, you lose the entire bet. The potential payout is calculated by multiplying the odds of each individual bet.<br />Betting on a accumulator gives you much higher potential winnings compared to betting on each bet individually, but it also has much higher risk, since losing a single bet means losing the entire bet.<br />Also known as <a href="#Parlay">Parlay</a> or <a href="#Combination Bet">Combination Bet</a>.',
          'American Odds': 'See <a href="#Moneyline Odds">Moneyline Odds</a>',
          'Action': 'A bet or wager of any kind.',
          'Arbitrage': 'See <a href="#Sure Bet">Sure Bet</a>.',
          'Ante Post': 'In the United states more commonly known as <a href="#Futures">Futures</a>. The term originates from horse racing, and is Latin for “before the post”. It was a bet that was placed before the horses were at the post.'
        },
        {
          'Bad beat': 'Losing a bet under unusual or exceptional circumstances. For example if you bet on a huge favourite in a match, and the underdog somehow still manages to win. Originates from poker, such as when the best hand gets outdrawn against all odds.',
          'Bookmaker': 'A bookmaker is the person or organisation that offers odds on events (mostly sports), accepts bets on those events and pay out winnings. Also referred to as <a href="#bookmaker">bookmaker</a> or <a href="#Bookie">Bookie</a>.',
          'Bookie': 'See <a href="#Bookmaker">Bookmaker</a>.'
        },
        {
          'Correct Score': 'A bet where the player predicts the final score of a match.',
          'Closing Line': 'The final odds offered before the game begins.',
          'Chalk': 'See <a href="#Favorite">Favorite</a>.',
          'Chalk Player': 'A player that wagers almost exclusively on favourites and almost never on the underdogs.'
        },
        {
          'Decimal Odds': 'Decimal odds are mostly used in Europe. For example: Fnatic 2.1 vs NiP 1.6. To calculate your potential profit, you multiply the odds with the amount you bet, and then remove the original bet amount. If you bet $100 on Fnatic, your potential return is 2.1 x 100 = $210. After which you distract your original bet, so the potential profit for this bet is $210 - $100 = $110.'
        },
        {
          'Exposure': 'The maximum amount of money a bookmaker stands to lose on any given event.',
          'Even Money': 'A bet with 1:1 odds. There is no profit to be made as a bettor, if you place a wager at even money and win you get only back your wager.'
        },
        {
          'Futures': 'Futures are bets on future events. This can be days but also weeks, months or years before the event.<br />While you get offered better odds by betting further in advance of an event, the drawback is that if your team doesn’t participate for the event, you lose your bet as well. Also known as <a href=""#Ante Post">Ante Post</a>.',
          'Favorite': 'The team with the lowest odds in a match, they are considered to be the better team. Also known as <a href="#Chalk">Chalk</a>.',
          'Fractional Odds': 'Odds that are mostly used in British bookmakers. For example: 2/3. To calculate your potential profit, you multiply the odds of the event with the amount you bet.'
        },
        {
          'Handicap': 'An advantage given by bookmakers to one team, in order to offer more attractive odds. Also known as spread. Used for spread betting.<br /><br />For example when Team Liquid plays Virtus.pro in a Dota 2 match, Team Liquid is a huge favourite and the game is expected to be pretty one sided. But if the bookmaker handicaps Team Liquid, it becomes a much more interesting bet.<br /><br />Lets say team Liquids get a negative handicap of (-1.5). To calculate the score, you subtract the handicap from the final score. If they end up at 2-1, this will leave them after the handicap is substracted with 0.5-1, leading the other team to win. This means that in a best-of-three they must win the game 2-0 to win the bet.<br /><br />A handicap can also be a positive number, lets give Virtus.pro (+1.5). To calculate the score, you just add this number to the final score to determine the winner. If the final score is 2-1, Virtus.pro wins the game after adding the handicap for a total of 2-2.5.',
          'Handicap Betting': 'See <a href="#Spread Betting">Spread Betting</a>.',
          'High roller': 'A person who bets for high amounts.',
          'Handle': 'Commonly used term in the United States. Refers to the total amount of money wagered on an event.',
          'Hook': 'A half-point in spread betting. If a team is favourited by 1.5, they say it’s favourited by 1 and a hook. Bookmakers often add the half point to avoid tie scenarios.'
        },
        {
          'Juice': 'The commission the bookmaker takes on each bet. Also known as <a href="#Vig">Vig</a>.'
        },
        {
          'Moneyline Odds': 'Moneyline odds, or also called American odds since they are commonly used in the United States.<br />A positive number indicates the underdog, and the odds tell you how much money you will win on a wager of $100.<br />A negative number indicates the favorite, and the odds tell you how much you must bet in order to win $100.<br />The higher the chance for the favorite team to win, the wider the odds for the favorite and the underdog are apart.<br /><br />For example: SKT T1 -425 vs Cloud9 +320.<br />If you decide to bet on SKT T1, who are the favorite, you have to bet $425 to win $100. If SKT T1 wins the match, you get $100 , for a total return of $525 (initial bet of $425 + $100 profit won). If you bet on Cloud9 and they win, you get your initial stake of $100 back in addition of $320, giving you a total payout of $420.'
        },
        {
          'Over/Under Bet': 'In an Over/Under bet the player must predict if a certain number is more or less than the limit set by the bookmaker.<br />For example, in a best-of-three CS:GO match, an over/under bet on 3 maps, means you bet on whether 3 maps will be played or not.',
          'Opening Line': 'The initial odds offered by the bookmaker when an event gets first posted. Once players start betting, the odds adjust accordingly.'
        },
        {
          'Parlay': 'Also known as <a href="#Accumulator">Accumulator</a> or <a href="#Combination Bet">Combination Bet</a>.'
        },
        {
          'Sure Bet': 'A sure bet, also referred to as betting arbitrage, is a set of bets on both sides of a game that guarantees a profit for the player, regardless the outcome of the match.<br />This can be done by placing multiple bets with different bookmakers on the same game.',
          'Spread Betting': 'Spread betting is a type of bet where the bookmaker adds or subtracts (handicaps) an amount of points from the final result to determine the winner of an event. This is mostly intended to create a more equal number of wagers on either side of an event.<br /> As most eSport games do not have a final score such as in football, but instead rely more on a win/lose scenario, it is not so often used yet. Also see <a href="#Handicap">Handicap</a>.'
        },
        {
          'Totals Bet': 'A bet where the player predicts if the total score of a game is over or under the total posted by the bookmaker. Also see <a href="#Over/Under Bet">Over/Under Bet</a>.'
        },
        {
          'Underdog': 'The team with the highest odds in a match, they are expected to be the worse team.'
        },
        {
          'Vig': 'See <a href="#Juice">Juice</a>.'
        }
      ]
    }
  }
})
</script>

<style lang="stylus">

.betting-terms
  margin 10px 40px
  padding 30px
  margin 0 auto

  > *
    margin 0px 0px 20px 0px

  .betting-terms__header
    color #2d3088
    font-size 22px
    display block
    font-size 26px
    margin-bottom 10px

  .betting-terms__intro
    color $purplegray
    background-color: #fff
    padding 30px
    margin-top 20px

    .text
      line-height 1.75

  .betting-terms__group
    display flex
    flex-flow row wrap
    justify-content space-between
    align-items flex-start
    color #62626f
    background-color #fff
    padding 20px

  .betting-terms__list
    margin 0px

    .glossary-row
      margin-bottom: 20px
  

</style>
