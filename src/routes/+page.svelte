<script lang="ts">
	import { navPath } from '$lib/store';
	import Currently from './Currently.svelte';
	import FeaturedProject from './FeaturedProject.svelte';

	export let data;
	// console.log(data);

	navPath.set('/');
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

<Currently song={data.name} artist={data.artist} songLink={data.link} />

<h3 class="text-sec mt-8 mb-4">Featured Projects</h3>

<FeaturedProject
	title="SeeFood"
	desc="is an AI nuitrition assistant that provides you with macro breakdowns from pictures of your meals"
	live="https://seefoodai.vercel.app/"
	code="https://github.com/arm-out/seefood"
	href="/seefood"
/>

<FeaturedProject
	title="NES"
	desc="is a fully functioning NES emulator written in Rust"
	code="https://github.com/arm-out/seefood"
	href="/nes"
/>

<FeaturedProject
	title="StageManager"
	desc="is a remote websocket based stage management system built for TEDxUCSD"
	code="https://github.com/arm-out/seefood"
	href="/seefood"
/>

<FeaturedProject
	title="ChartDuels"
	desc="is a single player browser game of higher or lower based on Spotify streaming data"
	live="https://www.chartduels.com/"
	code="https://github.com/arm-out/ChartDuels"
	href="/chartduels"
/>
