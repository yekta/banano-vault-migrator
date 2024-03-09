<script lang="ts">
	export let message: string;
	export { classes as class };
	let classes = '';
</script>

<div
	class="bg-c-bg rounded-xl max-w-lg text-center flex flex-col border-2 border-c-bg/20 {classes}"
>
	<p class="font-bold -mt-0.5 px-5 py-1.5 text-c-secondary text-lg">Your Vault's Status</p>
	<div class="w-full h-[2px] bg-c-bg/20"></div>
	<p class="bg-c-secondary rounded-[0.65rem] max-w-lg text-left px-5 py-2.5 text-sm">
		{message}
	</p>
</div>
