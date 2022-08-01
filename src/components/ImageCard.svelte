<script lang="ts">
	import type { Image } from '../types';
	import ImageTag from './ImageTag.svelte';
	import { searchQuery } from '../stores/searchQuery';

	export let image: Image;
	export let ref: HTMLDivElement | undefined = undefined;

	let tagsList = image.tags.split(',').slice(0, 3);

	const openLink = () => {
		window.open(image.pageURL, '_blank');
	};
</script>

<div bind:this={ref} class="container" on:click={openLink}>
	<img src={image.largeImageURL} alt="" />
	<div class="panel">
		<h4>Photo by {image.user}</h4>
		<span class="likes">Likes: {image.likes}</span>
	</div>
	<section class="tagsList">
		{#each tagsList as tag}
			<ImageTag on:click={() => searchQuery.set(tag)}>{tag}</ImageTag>
		{/each}
	</section>
</div>

<style lang="scss">
	.container {
		cursor: pointer;
		position: relative;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}

		.panel {
			display: none;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			margin: 12px 8px;
			animation: slidein 500ms;
		}

		.tagsList {
			display: none;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 1;
			padding: 12px 8px;
			animation: slidein 500ms;
		}

		&:hover {
			.panel {
				display: flex;
				flex-direction: column;
			}

			.tagsList {
				display: flex;
				gap: 4px;
			}
		}
	}

	h4 {
		color: #14b8a6;
		font-weight: bold;
		text-shadow: 1px 1px black;
		margin-bottom: 4px;
		font-size: 1.05rem;
	}

	.likes {
		font-size: 0.9rem;
		color: #14b8a6;
		text-shadow: 1px 1px black;
	}

	@keyframes slidein {
		from {
			transform: translateY(500%);
			opacity: 0.3;
		}

		90% {
			transform: translateY(-3%);
		}
		to {
			transform: translateY(0%);
			opacity: 1;
		}
	}
</style>
