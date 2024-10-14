<script lang="ts">
	import { page } from '$app/stores';
	export let data;

	console.log($page.url);
	let ogImg =
		'http://localhost:8787/og?title=' +
		encodeURIComponent(data.meta.title) +
		'&desc=' +
		encodeURIComponent(data.meta.description);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />

	<meta property="og:image" content={ogImg} />
	<link rel="og-image-for-prerender" href={ogImg} />
</svelte:head>

<svelte:component this={data.content} />
