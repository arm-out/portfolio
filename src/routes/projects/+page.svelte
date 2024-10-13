<script lang="ts">
	import ListItem from './ListItem.svelte';
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
	export let data;

	const projects = data.projects;
	// set of unique languages
	const languages = new Set<string>();
	projects.forEach((p) => p.languages.forEach((l) => languages.add(l)));

	let checked: string[] = [];
	let all = checked.length === 0;
	$: all = checked.length === 0;

	let changed = 2;
	$: console.log(checked);
	$: checked, (changed -= 1);
	$: console.log(changed);

	let isInternalNavigation = false;
	let external = false;
	onMount(() => {
		const unsubscribe = navigating.subscribe(($navigating) => {
			if ($navigating) {
				// This is an internal navigation
				isInternalNavigation = true;
			} else {
				// Navigation completed or it's the initial page load
				if (!isInternalNavigation) {
					// This is either the initial page load or an external navigation
					const referrer = document.referrer;
					const currentDomain = window.location.hostname;

					if (referrer && new URL(referrer).hostname === currentDomain) {
						// console.log('Navigated from another page within the domain');
					} else {
						// console.log('Navigated from an external source or direct access');
						external = true;
					}
				} else {
					// console.log('Completed internal navigation');
				}

				// Reset for next navigation
				isInternalNavigation = false;
			}
		});

		return () => {
			unsubscribe();
		};
	});

	$: console.log(external, 'external');
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="These are some of my personal projects and explorations" />
</svelte:head>

<h1 class="hidden">Projects</h1>
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

{#key [checked, external]}
	{#each projects as p, i (p.slug)}
		{#if all || p.languages.some((l) => checked.includes(l))}
			<ListItem {p} {i} {external} {changed} />
		{/if}
	{/each}
{/key}
