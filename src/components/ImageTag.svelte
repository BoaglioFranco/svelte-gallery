<span class="root" on:click|stopPropagation>
	<slot />
</span>

<style lang="scss">
	.root {
		font-size: 0.8rem;
		padding: 0.3rem 0.4rem;
		border-radius: 5000px;
		background-color: #e5e7eb;
		color: #475569;
		max-width: 33%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

    .root:hover{
        transform: scale(1.08);
        transition: all .2s;
    }
</style>
