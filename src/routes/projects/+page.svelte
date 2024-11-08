<script lang="ts">
	import { blur } from 'svelte/transition';
	import ListItem from '$lib/components/ListItem.svelte';
	import { onNavigate } from '$app/navigation';
	import { PUBLIC_OG_ENDPOINT } from '$env/static/public';
	import { page } from '$app/stores';
	export let data;

	const projects = data.projects;
	// set of unique languages
	const languages = new Set<string>();
	projects.forEach((p) => p.languages.forEach((l) => languages.add(l)));

	let checked: string[] = [];
	let all = checked.length === 0;
	$: all = checked.length === 0;

	let changed = 2;
	$: checked, (changed -= 1);

	onNavigate((nav) => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 450);
	});

	const ogImg =
		PUBLIC_OG_ENDPOINT +
		'/og?title=' +
		encodeURIComponent('Projects') +
		'&desc=' +
		encodeURIComponent('Some of my personal projects and explorations');
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="Some of my personal projects and explorations" />
	<link rel="canonical" href="https://arminsuraj.com{$page.route}" />

	<meta property="og:title" content="Projects - Armin Suraj" />
	<meta property="og:url" content="https://arminsuraj.com/projects" />
	<meta property="og:image" content={ogImg} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Some of my personal projects and explorations" />

	<meta property="twitter:title" content="Projects - Armin Suraj" />
	<meta property="twitter:description" content="Some of my personal projects and explorations" />
</svelte:head>

<h1 class="sr-only">Projects</h1>
<p class="mb-8">
	These are some of my personal projects and explorations. It's my way to discover useful solutions,
	train my eyes for details, and develop more specific insights in certain topics.
</p>

<div class="flex w-full gap-x-3 flex-row flex-wrap">
	<label
		class="{all
			? 'bg-arm/30'
			: ''} underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm cursor-pointer"
	>
		<input type="checkbox" bind:checked={all} class="hidden" on:click={() => (checked = [])} />
		View All
	</label>

	{#each languages as l}
		<label
			class="{checked.includes(l)
				? 'underline decoration-arm decoration-1 underline-offset-[3px] bg-arm/30 text-white'
				: ''} hover:bg-arm hover:text-white text-nowrap cursor-pointer text-sec"
		>
			<input type="checkbox" bind:group={checked} value={l} class="hidden" />
			{l}
		</label>
	{/each}
</div>

<hr class="w-full mt-2 mb-4 h-[1px] bg-outline border-0" />

{#key changed}
	<div in:blur={{ delay: 300, duration: 500 }} out:blur={{ duration: 300 }}>
		{#each projects.filter((p) => all || p.languages.some( (l) => checked.includes(l) )) as p, i (p.slug)}
			<ListItem {p} />
		{/each}
	</div>
{/key}
