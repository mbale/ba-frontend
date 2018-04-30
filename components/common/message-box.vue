<template>
	<div class="message-box">
    <slot />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'MessageBox'
})
</script>

<style lang="stylus">

.message-box
	display flex
	height fit-content
	align-items center
	padding 10px 15px

	h4
		color white

	&--success
		background-color $green

	&--error
		background-color $red

	&--progress
		background-color $orange

</style>
