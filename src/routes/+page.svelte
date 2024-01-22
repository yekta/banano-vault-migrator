<script lang="ts">
	import { bananoWallets } from '@ts/constants/bananoWallets';
	import { canonicalUrl } from '@ts/constants/main';
	import type { TWallet } from '@ts/types/main';
	import { MetaTags } from 'svelte-meta-tags';
	import BgWaveBottom from '@components/backgrounds/BgWaveBottom.svelte';
	import Button from '@components/Button.svelte';
	import BgHeroCover from '@components/backgrounds/BgHeroCover.svelte';
	import IconEyeClosed from '@components/icons/IconEyeClosed.svelte';
	import IconEyeOpen from '@components/icons/IconEyeOpen.svelte';
	import IconArrow from '@components/icons/IconArrow.svelte';
	import { onMount } from 'svelte';
	import { decryptSeed, isSeedValid } from '@ts/utils/decryptSeed';

	const description =
		'Banano Vault has been deprecated. Our new browser-based official Banano wallet is The Banano Stand. Time to move on.';
	const title = 'Banano Vault';
	const canonical = canonicalUrl;
	const imageUrl = `${canonicalUrl}/previews/home.jpg`;

	let migrationState: 'idle' | 'encrypted-seed-found' | 'seed-decrypted' = 'idle';
	let passwordInput: string;
	let passwordInputError: string | undefined;
	let encryptedSeed: string | undefined;
	let decryptedSeed: string | undefined;
	let isSeedHidden = true;
	const SEED_LENGTH = 64;
	const hiddenSeedPlaceholderString = Array.from({ length: SEED_LENGTH })
		.map((_) => '•')
		.join('');
	const VAULT_LOCALSTORAGE_KEY = 'nanovault-wallet';

	const wallets: TWallet[] = [
		{
			title: 'The Banano Stand',
			description: 'Browser-based lightwallet that also supports Ledger Nano S. Ideal for desktop.',
			buttonText: 'Visit BananoStand',
			url: bananoWallets.thebananostand.url,
			img: 'thebananostand'
		},
		{
			title: 'Kalium',
			description:
				'Send Banano to all your friends on the go with Kalium. Available on iOS & Android.',
			buttonText: 'Download Kalium',
			url: bananoWallets.kalium.url,
			img: 'kalium-wallet'
		}
	];

	const imgExtention = 'png';

	function onDecryptFormSubmit(event: Event) {
		if (!passwordInput) {
			passwordInputError = 'Please enter a password.';
			return;
		}
		if (!encryptedSeed) {
			passwordInputError = "No encrypted seed found, can't decrypt.";
			return;
		}
		try {
			const _decryptedSeed = decryptSeed({
				password: passwordInput,
				encryptedSeed
			});
			console.log(`Decrypted seed is: ${_decryptedSeed}`);
			if (!_decryptedSeed) {
				passwordInputError = 'Something went wrong with the decryption.';
				return;
			}
			const isValid = isSeedValid(_decryptedSeed);
			if (isValid) {
				passwordInputError = 'Decrypted seed is invalid.';
				return;
			}
			migrationState = 'seed-decrypted';
			decryptedSeed = _decryptedSeed;
		} catch (error) {
			console.log(error);
			passwordInputError = 'Something went wrong with the decryption.';
		}
	}

	onMount(() => {
		try {
			const vaultData = localStorage.getItem(VAULT_LOCALSTORAGE_KEY);
			if (vaultData) {
				const parsedVaultData = JSON.parse(vaultData);
				if (parsedVaultData && parsedVaultData.locked && parsedVaultData.seed) {
					encryptedSeed = parsedVaultData.seed;
					migrationState = 'encrypted-seed-found';
				}
			} else {
				console.log('No Banano Vault data found.');
			}
		} catch (error) {
			console.log(error);
		}
	});
</script>

<MetaTags
	{title}
	{description}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title: title,
		description: description,
		images: [
			{
				url: imageUrl,
				width: 1200,
				height: 630
			}
		]
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: title,
		description: description,
		image: imageUrl
	}}
/>

<div class="w-full bg-c-secondary flex flex-col items-center justify-start text-center">
	<div class="w-full relative flex flex-row justify-center overflow-hidden">
		<div
			class="w-full bg-c-secondary min-h-[500px] md:min-h-[500px] flex justify-center overflow-hidden"
		>
			<BgHeroCover />
			<BgWaveBottom />
			<div
				class="w-full max-w-7xl px-8 md:px-24 flex flex-col items-center self-center pt-20 pb-32 md:pt-24 md:pb-36 relative z-10 text-c-bg"
			>
				<h1 class="font-bold text-4xl md:text-5xl">Time to move on!</h1>
				<p class="text-xl mt-5 max-w-2xl">
					Banano Vault is no longer supported. We have a better official browser-based wallet now:
					<a href={bananoWallets.thebananostand.url} target="_blank" class="hover:underline"
						>The Banano Stand</a
					>.
				</p>
				<Button
					class="mt-6"
					buttonType="primary"
					href={migrationState !== 'idle' ? '/#migrate' : bananoWallets.thebananostand.url}
					target={migrationState !== 'idle' ? undefined : '_blank'}
				>
					{migrationState !== 'idle' ? 'Start Migrating' : 'Visit The Banano Stand'}
				</Button>
			</div>
		</div>
	</div>
	<div
		id={migrationState !== 'idle' ? 'migrate' : 'banano-stand'}
		class="w-full flex flex-col items-center bg-c-bg -mt-2 pt-14 pb-12 relative px-3 md:px-8"
	>
		{#if migrationState === 'encrypted-seed-found'}
			<h2 class="text-3xl font-bold px-3 md:px-3">Migrate to The Banano Stand</h2>
			<p class="w-full max-w-3xl text-lg mt-3 px-3 md:px-3">
				We've found an encrypted seed in your browser storage. You can start migrating to <a
					class="font-bold text-c-secondary hover:underline"
					target="_blank"
					href={bananoWallets.thebananostand.url}>The Banano Stand</a
				> by entering your password below to decrypt your seed.
			</p>
			<form
				on:submit={onDecryptFormSubmit}
				class="w-full max-w-xl flex flex-wrap md:flex-nowrap items-start justify-center gap-4 md:gap-2 mt-6"
			>
				<div class="flex-1 flex flex-col">
					<input
						on:input={() => (passwordInputError = undefined)}
						type="password"
						bind:value={passwordInput}
						class="w-full font-medium placeholder-c-on-bg/50 text-c-on-bg px-4 py-4.5 rounded-xl
						border-[3px] bg-c-on-bg/5 border-c-on-bg/8 hover:border-c-on-bg/30 focus:border-c-secondary transition"
					/>
					{#if passwordInputError !== undefined}
						<p class="w-full px-2 py-1 text-sm text-left font-semibold text-c-danger">
							{passwordInputError}
						</p>
					{/if}
				</div>
				<Button class="w-full md:w-auto" buttonType="secondary" type="submit">Decrypt</Button>
			</form>
		{:else if migrationState === 'seed-decrypted'}
			<h2 class="text-3xl font-bold px-3 md:px-3">Seed Decrypted!</h2>
			<p class="w-full max-w-3xl text-lg mt-3 px-3 md:px-3">
				You can find your decrypted seed below. Back it up to somewhere safe first. Then visit <a
					class="font-bold text-c-secondary hover:underline"
					target="_blank"
					href={bananoWallets.thebananostand.url}>The Banano Stand</a
				> and import it there to continue using your wallet.
			</p>
			<div class="w-full max-w-3xl flex items-start justify-center mt-6 gap-2">
				<div
					class="flex-1 break-all text-c-on-bg px-4 py-4.5 rounded-xl
					border-[3px] bg-c-on-bg/5 border-c-on-bg/8 transition font-mono font-semibold"
				>
					{isSeedHidden ? hiddenSeedPlaceholderString : decryptedSeed}
				</div>
				<Button buttonType="secondary" onClick={() => (isSeedHidden = !isSeedHidden)}>
					<div class="py-1">
						{#if isSeedHidden}
							<IconEyeOpen />
						{:else}
							<IconEyeClosed />
						{/if}
					</div>
				</Button>
			</div>
		{/if}
		{#if migrationState !== 'encrypted-seed-found'}
			{#if migrationState === 'seed-decrypted'}
				<div class="py-8">
					<IconArrow class="transform -rotate-90 w-10 h-10 text-c-secondary" />
				</div>
			{/if}
			<h2 class="text-3xl font-bold px-3 md:px-3">Switch to The Banano Stand</h2>
			<p class="w-full max-w-3xl text-lg mt-3 px-3 md:px-3">
				{#if migrationState === 'seed-decrypted'}
					You can now take your seed and import it to The Banano Stand to continue using your
					wallet. If you prefer a mobile wallet instead, try Kalium.
				{:else}
					The Banano Stand is the official browser-based wallet for Banano going forward. You can
					use it instead of Banano Vault. Alternatively, you can use Kalium which is our mobile
					wallet for iOS and Android.
				{/if}
			</p>
			<div class="w-full max-w-7xl flex flex-row flex-wrap justify-center -mt-8">
				{#each wallets as wallet}
					<div
						class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[19rem] flex flex-col items-center px-4 md:px-6 py-4 mt-10 md:mt-12"
					>
						<img
							width="620"
							height="1100"
							src="/images/wallets/{wallet.img}.{imgExtention}"
							alt={wallet.title}
						/>
						<h3 class="w-full font-bold text-xl mt-4">{wallet.title}</h3>
						<p class="mt-2">{wallet.description}</p>
						<Button class="w-full mt-5" buttonType="secondary" href={wallet.url} target="_blank">
							{wallet.buttonText}
						</Button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
