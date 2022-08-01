<script lang="ts">
	import '../global.css';
	import { QueryClientProvider } from '@sveltestack/svelte-query';
</script>

<QueryClientProvider>
	<slot />
</QueryClientProvider>
