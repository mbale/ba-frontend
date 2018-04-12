<template>
	<div class="content faq-container">
		<div class="content-body">
			<h2 class="content-title">FAQ</h2>

			<h3 class="question-heading">What is Betacle?</h3>
			<p class="question-paragraph">Betacle is a website built to help those interested in esports betting develop their understanding of the subject, through detailed guides, bookmaker reviews, and an active community of esports bettors who wish to share their experience with other users. Betacle is rapidly developing as a platform for esports bettors to gain valuable knowledge of the esports betting landscape, as it similarly grows and changes. Our ultimate goal is to supply our users with accurate and detailed knowledge, to empower them to bet on esports confidently and intelligently.</p>

			<h3 class="question-heading">What is esports?</h3>
			<p class="question-paragraph">Esports is the term used for organised competitive gaming, where professional teams and players compete in leagues and events across a wide variety of games. They range from games played on PC, console, and mobile, coming in a multitude of form factors. Esports has grown exponentially in recent years, with prize pools, player numbers and viewer counts all experiencing rapid growth.</p>

			<h3 class="question-heading">What is esports betting?</h3>
			<p class="question-paragraph">Betting on esports is very similar to betting on traditional sports. Teams and individuals compete across a growing number of esports titles in a highly competitive environment. With such a large number of games, leagues and therefore matches being played, there are always fixtures to bet on. In traditional sports, there are vast differences between the various sports, and the same applies to esports.</p>

			<h3 class="question-heading">Where can I bet on esports?</h3>
			<p class="question-paragraph">There are a growing number of bookmakers and sportsbooks who offer comprehensive platforms to bet on esports with. They can generally be categorised in two ways; traditional bookmakers who offer markets on esports, and specialist esports sportsbooks, who focus on esports markets only. A key goal of Betacle is to help users find the best websites to bet on esports. View our <a href="/bookmakers">bookmakers page</a> to read reviews and find the best bookmaker for you.</p>

			<h3 class="question-heading">Is placing esport bets safe?</h3>
			<p class="question-paragraph">Esports is becoming increasingly regulated to uphold the same level of integrity as the highest tiers of traditional sport. Tournament organisers are working with independent regulators who are focusing on improving the key areas that uphold the integrity of a sport, such as match-fixing, and doping. There have been a number of isolated cases where these were breached, however these cases are infrequent, and haven’t taken place at major events. To find bookmakers who are safe to deposit your money into, visit our <a href="/bookmakers">bookmakers page</a>. Placing a bet on esports can be considered as safe as betting on traditional sports, providing you are betting with a professional company, and it can be worthwhile to do your research.</p>

			<h3 class="question-heading">Are there age restrictions when betting on esports? How old do I have to be?</h3>
			<p class="question-paragraph">Age restrictions when betting on esports work similarly to betting on any other sport. The best practice when betting on esports is to determine the minimum age required to gamble in the country that you live in, and strictly adhere to that. Some sportsbooks and bookmakers will operate their own age restriction that may be greater than that of the country you live in, and it is important to understand these restrictions, and follow the rules and laws. Most websites operate an identification verification system, to ensure that any users placing bets meet the minimum requirements. </p>

			<h3 class="question-heading">How do esport bonuses work?</h3>
			<p class="question-paragraph">Esports bonus offers come in a variety of different form factors. Many of these offers can be tough to thoroughly understand. Because of this, we’ve written a <a href="/guides/understanding-bonus-offers">full guide on how esports bonus offers work</a>, offering tips on how to make the most of these offers, and how to avoid getting caught out.</p>

			<h3 class="question-heading">Do I have to pay taxes on winnings from esports bets?</h3>
			<p class="question-paragraph">Esports betting winnings come under the same bracket as traditional sports betting winnings, and therefore the same rules apply. Some countries are tax exempt when it comes to winnings from betting on esports and sports, whilst others tax bettors on their winnings. Our advice is that users refer to the country they reside ins laws and regulations, and strictly adhere to those.</p>


			<h4>Follow us on <a href="https://twitter.com/BetacleEsports">Twitter</a> and <a href="https://www.facebook.com/BetacleEsports">Facebook</a> to stay up to date with the latest esports betting related content.</h4>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Bookmakers',
  components: {
  },
  head () {
    return {
      title: 'Betacle - FAQ'
    }
  }
})
</script>

<style lang="stylus" scoped>

.content-body
  margin: 25px 10px 40px 10px

.content-title
  color: $purple

.content
	max-width: 1440px
	width: 100%
	margin-top: 20px
	margin-bottom: 20px
	display: flex
	flex-direction: row

	.content-body
		max-width: 800px
		margin: 0 auto
		padding: 30px
		padding-top: 20px
		background-color: white

		.content-title
			font-size: 45px
			font-weight: bold
			margin-top: 0

		.question-heading
			font-size: 24px
			color: black
			font-weight: bold

		.question-paragraph
			font-size: 20px
			margin-top: 10px
			margin-bottom: 55px

</style>
