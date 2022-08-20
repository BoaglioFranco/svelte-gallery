<script lang="ts">
	import { searchQuery } from '../stores/searchQuery';

	let input = '';
	let timer: any = null;

	//update input on filter change
	searchQuery.subscribe((updatedQuery) => {
		input = updatedQuery;
	});

	$: {
		console.log('effect');
		clearTimeout(timer);
		timer = setTimeout(() => {
			searchQuery.set(input);
		}, 650);
	}
</script>

<div>
	<input placeholder="Filter images" bind:value={input} />
</div>

<style lang="scss">
	input {
		margin-top: 0.5rem;
		height: 40px;
		line-height: 24px;
		color: rgb(45, 55, 72);
		font-size: 1.1rem;
		background-color: transparent;
		border: none;
		border-radius: 6px;
		transition: all .2s;
		outline: none;
		flex-shrink: 1;

		&:hover, &:focus {
			background-color: rgba(45, 55, 72, .06);;
		}

		@media screen and (max-width: 500px) {
			max-width: min-content;
		}
	}
</style>
