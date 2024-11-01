<script lang="ts">
	import { afterNavigate, disableScrollHandling, onNavigate } from '$app/navigation';
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

	<meta property="og:title" content={data.meta.title} />
	<meta property="og:url" content="https://arminsuraj.com/projects/{$page.params.slug}" />
	<meta property="og:image" content={ogImg} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={data.meta.description} />

	<meta property="twitter:title" content={data.meta.title} />
	<meta property="twitter:description" content={data.meta.description} />
</svelte:head>

<div>
	<h1 class="inline-block">
		{data.meta.title}
	</h1>
	<span class="text-sec font-light italic pl-1">{data.meta.languages.join(', ')}</span>
</div>
<h2 class="text-sec">{data.meta.description}</h2>
<div class="flex gap-4 pt-1">
	{#if data.meta.live}
		<a class="text-sec text-xs flex items-center gap-1.5" href={data.meta.live} target="_blank"
			>Live
			<span class="w-3.5 h-3.5 p-0.5 bg-arm flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					fill="white"
					viewBox="0 0 256 256"
					class="shrink-0 text-gray-12"
					><path
						d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"
					></path></svg
				>
			</span>
		</a>
	{/if}

	{#if data.meta.code}
		<a class="text-sec text-xs flex items-center gap-1.5" href={data.meta.code} target="_blank"
			>Code
			<span class="w-3.5 h-3.5 p-0.5 bg-arm flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					fill="white"
					viewBox="0 0 256 256"
					class="shrink-0 text-gray-12"
					><path
						d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"
					></path></svg
				>
			</span>
		</a>
	{/if}
</div>

<br />

<svelte:component this={data.content} />
