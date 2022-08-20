<script lang="ts">
	import SearchInput from './SearchInput.svelte';

	export let title: string;
</script>

<nav>
	<div class="content">
		<h1>{title}</h1>
		<SearchInput />
	</div>
</nav>
<div class="filler" />

<style lang="scss">
	nav {
		position: fixed;
		top: 0;
		z-index: 10;
		width: 100%;
		background-color: #f2f2f2;
		display: flex;
		justify-content	: center;

		.content {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			margin: 1rem;
			padding: 0 1rem;

			@media screen and (min-width: 1000px) {
				width: 90%;
			}
			@media screen and (min-width: 1200px) {
				width: 85%;
			}

			@media screen and (min-width: 1600px) {
				width: 80%;
			}
		}
	}

	h1 {
		font-family: -ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
		font-weight: 700;
		font-size: 2rem;
		text-align: center;
		margin-right: auto;

		//responsiveness to be improved
		@media screen and (min-width: 600px) {
			font-size: 2.5rem;
		}
		@media screen and (min-width: 750px) {
			font-size: 3rem;
		}
	}

	.filler {
		height: 80px;
	}
</style>
