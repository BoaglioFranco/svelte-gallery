<script lang="ts">
	import { searchQuery } from '../stores/searchQuery';

	export let title: string;
</script>

<nav>
	<h1>{title}</h1>
	<p>{$searchQuery}</p>
</nav>
<div class="filler"></div>

<style lang="scss">
	nav {
		display: flex;
		justify-content: center;
		position: fixed;
		top: 0;
		z-index: 10;
		width: 100%;
		background-color: #f2f2f2;
	}

	h1 {
		font-family: -ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
		font-weight: 700;
		font-size: 3rem;
		margin: 1rem;
		text-align: center;
	}

	.filler {
		height: 80px;
	}
</style>
