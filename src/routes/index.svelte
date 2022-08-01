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

<Header title="Svelte Image Gallery" />
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
		margin: 1rem 4rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-auto-rows: 190px;
		gap: 12px;
		width: 70%;
		margin: auto;
	}

	p {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
