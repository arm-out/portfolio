<script lang="ts">
	import { blur } from 'svelte/transition';
	import ListItem from '$lib/components/ListItem.svelte';
	import { onNavigate } from '$app/navigation';
	import { PUBLIC_OG_ENDPOINT } from '$env/static/public';
	import { page } from '$app/stores';
	export let data;

	const notes = data.notes;

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
		encodeURIComponent('Notes') +
		'&desc=' +
		encodeURIComponent('Some of my thoughts and ruminations');
</script>

<svelte:head>
	<title>Notes</title>
	<meta name="description" content="Some of my thoughts and ruminations" />
	<link rel="canonical" href="https://arminsuraj.com{$page.route}" />

	<meta property="og:title" content="Notes - Armin Suraj" />
	<meta property="og:url" content="https://arminsuraj.com/notes" />
	<meta property="og:image" content={ogImg} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Some of my thoughts and ruminations" />

	<meta property="twitter:title" content="Projects - Armin Suraj" />
	<meta property="twitter:description" content="Some of my thoughts and ruminations" />
</svelte:head>

<h1 class="sr-only">Notes</h1>

<p class="mb-8">
	This is a collection of my various thoughts and ruminations. Too ephemeral to be a blog post, too
	long to be a tweet.
</p>

<hr class="w-full mt-2 mb-4 h-[1px] bg-outline border-0" />
{#key changed}
	<div in:blur={{ delay: 300, duration: 500 }} out:blur={{ duration: 300 }}>
		{#each notes as p, i (p.slug)}
			<ListItem {p} notes={true} />
		{/each}
	</div>
{/key}
