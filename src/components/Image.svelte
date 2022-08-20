<script lang="ts">
	export let src: string;
	export let className: string | undefined;
	export let preview: string;
</script>

<div>
	<img {src} class={className} />
</div>


<style lang="scss">

</style>