<script lang="ts">
	import '@css/app.css';
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.background = `rgb(var(--c-bg))`;
	});
</script>

<main class="w-full bg-c-bg text-c-on-bg font-filson-pro flex flex-col justify-start">
	<slot />
</main>
