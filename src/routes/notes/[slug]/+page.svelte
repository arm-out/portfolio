<script lang="ts">
	import { afterNavigate, disableScrollHandling } from '$app/navigation';
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
	<meta property="og:image" content={ogImg} />
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
