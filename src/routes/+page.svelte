<script lang="ts">
	import { canonicalUrl } from '@ts/constants';
	import { MetaTags } from 'svelte-meta-tags';

	const description =
		'Banano Vault is now deprecated. Our new browser-based official Banano wallet is The Banano Stand. Time to move on.';
	const title = 'Banano Vault';
	const canonical = canonicalUrl;
	const imageUrl = `${canonicalUrl}/previews/home.jpg`;
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

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
