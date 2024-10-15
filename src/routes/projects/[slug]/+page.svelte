<script lang="ts">
	import { PUBLIC_OG_ENDPOINT } from '$env/static/public';

	export let data;
	let ogImg =
		PUBLIC_OG_ENDPOINT +
		'/og?title=' +
		encodeURIComponent(data.meta.title) +
		'&desc=' +
		encodeURIComponent(data.meta.description);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:image" content={ogImg} />
</svelte:head>

<svelte:component this={data.content} />
