<script lang="ts">
	import { bananoSocials } from '@ts/constants/bananoSocials';
	import { onMount } from 'svelte';
	import Logo from '@components/Logo.svelte';
	import { isTouchscreen } from '@ts/stores/isTouchscreen';
	import ProgressBar from '@components/ProgressBar.svelte';
	import type { TIconSocial } from '@ts/types/main';
	import IconSocial from '@components/icons/IconSocial.svelte';

	export { classes as class };
	let classes = '';

	let notAtTheTop = false;

	interface Section {
		title: string;
		id: string;
		href: string;
		classes?: string;
		icon?: string;
	}
	interface SocialButton {
		title: string;
		icon: TIconSocial;
		href: string;
	}
	const socials: SocialButton[] = [
		{
			title: bananoSocials.discord.title,
			icon: bananoSocials.discord.iconString,
			href: bananoSocials.discord.url
		},
		{
			title: bananoSocials.twitter.title,
			icon: bananoSocials.twitter.iconString,
			href: bananoSocials.twitter.url
		},
		{
			title: bananoSocials.reddit.title,
			icon: bananoSocials.reddit.iconString,
			href: bananoSocials.reddit.url
		},
		{
			title: bananoSocials.youtube.title,
			icon: bananoSocials.youtube.iconString,
			href: bananoSocials.youtube.url
		}
	];

	onMount(() => {
		setNotAtTheTop();
	});

	function setNotAtTheTop() {
		if (window.scrollY > 10) {
			notAtTheTop = true;
		} else {
			notAtTheTop = false;
		}
	}

	function handleScroll() {
		setNotAtTheTop();
	}
</script>

<svelte:window on:scroll={handleScroll} />
<nav
	class="{notAtTheTop
		? 'text-c-secondary'
		: 'text-c-primary'} font-filson-pro w-full flex justify-center fixed top-0 left-0 right-0 z-50 {classes}"
>
	<ProgressBar {notAtTheTop} />
	<div
		class="{notAtTheTop
			? 'translate-0'
			: '-translate-y-24'} transform transition duration-250 bg-c-bg shadow-navbar
			shadow-c-secondary/13 absolute left-0 bottom-2 w-full h-full pointer-events-none ring-4 ring-c-bg-shaded"
	/>
	<div
		class="{notAtTheTop
			? '-translate-y-1'
			: 'translate-0'} transition w-full max-w-7xl flex flex-row items-stretch justify-between px-4 relative"
	>
		<a
			aria-label="Go to Home"
			href="/"
			data-sveltekit-prefetch
			class="mr-4 md:mr-12 py-3 group rounded-lg relative z-0 h-full flex flex-row items-center"
		>
			<div class="pt-2 pb-2 md:pb-2.5 px-1">
				<Logo
					class="{notAtTheTop
						? $isTouchscreen
							? ''
							: 'group-hover:text-c-on-bg'
						: $isTouchscreen
							? ''
							: 'group-hover:text-c-bg'} {notAtTheTop
						? 'scale-90'
						: ''} transition max-w-full w-44 md:w-48 h-auto transform origin-left"
				/>
			</div>
		</a>
		<div class="flex justify-end">
			{#each socials as social}
				<a
					href={social.href}
					target="_blank"
					class="font-medium group flex items-center py-3 {social.title !== 'Discord' &&
						'hidden md:block'}"
				>
					<div
						class="p-1.5 rounded-lg transition group-hover:bg-c-secondary group-hover:text-c-bg
						shadow-navbar-button group-hover:shadow-navbar-button-hover shadow-c-on-bg/40 group-hover:shadow-c-secondary-shaded"
					>
						<IconSocial type={social.icon} class="w-9 h-9" />
					</div>
				</a>
			{/each}
		</div>
	</div>
</nav>
