<script lang="ts">
	import { onMount } from 'svelte';
	import Currently from './Currently.svelte';
	import FeaturedProject from './FeaturedProject.svelte';
	import { navigating } from '$app/stores';

	export let data;

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
</script>

<svelte:head>
	<title>Armin Suraj</title>
	<meta
		name="description"
		content="Studying Computer Science at the University of California, San Diego. Passionate about technology, music, and design. Consistently improving through learning."
	/>
</svelte:head>

<h1 class="hidden">Armin Suraj</h1>
<p class="mb-4">
	I'm a creative <a
		href="https://www.youtube.com/watch?v=jG7dSXcfVqE"
		target="_blank"
		class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm"
		>doing what I can't.</a
	> Exploring ways to use technology to create unique experiences and solve complex problems.
</p>

<Currently spotify={data.spotify} literal={data.literal} />

<h3 class="text-sec mt-8 mb-4">Featured Projects</h3>

{#key external}
	<FeaturedProject
		title="SeeFood"
		desc="is an AI nuitrition assistant that provides you with macro breakdowns from pictures of your meals"
		live="https://seefoodai.vercel.app/"
		code="https://github.com/arm-out/seefood"
		href="/seefood"
		i={0}
		{external}
	/>

	<FeaturedProject
		title="NES"
		desc="is a fully functioning NES emulator written in Rust"
		code="https://github.com/arm-out/seefood"
		href="/nes"
		i={1}
		{external}
	/>

	<FeaturedProject
		title="StageManager"
		desc="is a remote websocket based stage management system built for TEDxUCSD"
		code="https://github.com/arm-out/seefood"
		href="/seefood"
		i={2}
		{external}
	/>

	<FeaturedProject
		title="ChartDuels"
		desc="is a single player browser game of higher or lower based on Spotify streaming data"
		live="https://www.chartduels.com/"
		code="https://github.com/arm-out/ChartDuels"
		href="/chartduels"
		i={3}
		{external}
	/>
{/key}
