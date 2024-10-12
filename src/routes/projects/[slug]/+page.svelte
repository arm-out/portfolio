<script lang="ts">
	import { navPath } from '$lib/store';

	export let data;
	navPath.set(`/projects/${data.meta.slug}`);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.desc} />
</svelte:head>

<svelte:component this={data.content} />
