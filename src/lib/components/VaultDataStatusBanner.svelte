<script lang="ts">
	import IconInfo from '@components/icons/IconInfo.svelte';

	export let message: string;
	export { classes as class };
	let classes = '';
</script>

<div
	class="bg-c-secondary-shaded/50 px-4.5 pt-2.75 pb-3 rounded-xl max-w-md
	text-left flex flex-col ring-2 ring-c-secondary-shaded/75 {classes}"
>
	<div class="flex items-center justify-start gap-1">
		<IconInfo class="w-5.5 h-5.5 shrink-0" />
		<p class="font-medium text-lg leading-tight">Your Wallet Status</p>
	</div>
	<p class="text-left text-sm mt-1 text-c-bg/75 font-normal break-words">
		{message}
	</p>
</div>
