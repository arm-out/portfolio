<script lang="ts">
	import { afterNavigate, disableScrollHandling } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_OG_ENDPOINT } from '$env/static/public';

	export let data;
	let ogImg =
		PUBLIC_OG_ENDPOINT +
		'/og?title=' +
		encodeURIComponent(data.meta.title) +
		'&desc=' +
		encodeURIComponent(data.meta.description);

	afterNavigate(() => {
		disableScrollHandling();
	});
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<link rel="canonical" href="https://arminsuraj.com/notes/{$page.params.slug}" />

	<meta property="og:title" content={data.meta.title} />
	<meta property="og:url" content="https://arminsuraj.com/notes/{$page.params.slug}" />
	<meta property="og:image" content={ogImg} />
	<meta property="og:type" content="article" />
	<meta property="og:description" content={data.meta.description} />

	<meta property="twitter:title" content={data.meta.title} />
	<meta property="twitter:description" content={data.meta.description} />
</svelte:head>

<article>
	<div>
		<h1 class="inline-block">
			{data.meta.title}
		</h1>
		<time datetime={data.meta.date} class="text-sec font-light italic pl-1"
			>{new Date(data.meta.date).toLocaleDateString('us', {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})}</time
		>
	</div>
	<p class="text-sec">{data.meta.description}</p>

	<br />

	<svelte:component this={data.content} />
</article>
