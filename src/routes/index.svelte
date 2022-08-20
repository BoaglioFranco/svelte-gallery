<script lang="ts">
	import { useInfiniteQuery } from '@sveltestack/svelte-query';
	import { onDestroy } from 'svelte';
	import ImageCard from '../components/ImageCard.svelte';
	import Header from '../components/Header.svelte';
	import { fetchPhotos } from '../fetchPhotos';
	import { searchQuery } from '../stores/searchQuery';
	import type { QueryResponse } from '../types';

	const photosQuery = useInfiniteQuery<any, Error, QueryResponse>(
		['photos', $searchQuery],
		fetchPhotos,
		{
			getNextPageParam: (lastGroup) => lastGroup.nextPage
		}
	);

	const unsuscribe = searchQuery.subscribe(() => {
		$photosQuery.remove();
		$photosQuery.refetch();
	});

	//Infinite scrolling logic
	let lastElementRef: HTMLDivElement;
	let observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting && $photosQuery.hasNextPage) {
			$photosQuery.fetchNextPage();
		}
	});
	$: if (!$photosQuery.isLoading && $photosQuery.data?.pages?.length! > 0) {
		if (lastElementRef) {
			observer.observe(lastElementRef);
		}
	}

	onDestroy(() => unsuscribe());
</script>

<Header title="Svelte Gallery" />
{#if $photosQuery.isLoading}
	<p>loading</p>
{:else if $photosQuery.status === 'error'}
	<span>Error: {$photosQuery.error.message}</span>
{:else if $photosQuery.data}
	<div class="grid">
		{#each $photosQuery.data.pages as page}
			{#each page.hits as image, i}
				{#if i + 1 !== page.hits.length}
					<ImageCard {image} />
				{:else}
					<ImageCard bind:ref={lastElementRef} {image} />
				{/if}
			{/each}
		{/each}
	</div>
{/if}

<style lang="scss">
	.grid {
		margin: 1rem auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
		justify-items: center;
		gap: 12px;

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

	p {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
