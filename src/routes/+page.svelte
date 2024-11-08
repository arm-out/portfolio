<script lang="ts">
	import Currently from './Currently.svelte';
	import FeaturedProject from './FeaturedProject.svelte';
	import { PUBLIC_OG_ENDPOINT } from '$env/static/public';

	export let data;

	const ogImg =
		PUBLIC_OG_ENDPOINT +
		'/og?title=' +
		encodeURIComponent(' ') +
		'&desc=' +
		encodeURIComponent(' ');
</script>

<svelte:head>
	<title>Armin Suraj</title>
	<meta
		name="description"
		content="Software engineer living in the intersection of design and technology"
	/>
	<link rel="canonical" href="https://arminsuraj.com" />

	<meta property="og:title" content="Armin Suraj" />
	<meta property="og:url" content="https://arminsuraj.com" />
	<meta property="og:image" content={ogImg} />
	<meta property="og:type" content="website" />
	<meta
		property="og:description"
		content="Software engineer living in the intersection of design and technology"
	/>

	<meta property="twitter:title" content="Armin Suraj" />
	<meta
		property="twitter:description"
		content="Software engineer living in the intersection of design and technology"
	/>
</svelte:head>

<h1 class="sr-only">Armin Suraj</h1>
<p class="mb-4">
	I'm a creative <a
		href="https://www.youtube.com/watch?v=jG7dSXcfVqE"
		target="_blank"
		class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm"
		>doing what I can't.</a
	> Exploring ways to use technology to create unique experiences and solve complex problems.
</p>

<Currently spotify={data.spotify} literal={data.literal} />

<h2 class="text-sec mt-8 mb-4">Featured Projects</h2>

<FeaturedProject
	title="NES"
	desc="is a fully functioning NES emulator written in Rust"
	code="https://github.com/arm-out/NES"
	href="/projects/NES"
/>

<FeaturedProject
	title="habit"
	desc="a social network that uses social accountability to track habits with friends"
	live="https://habitsnap.vercel.app/"
	code="https://github.com/arm-out/habit"
	href="/projects/habit"
/>

<FeaturedProject
	title="SuperSlowMo"
	desc="is an ML pipeline that can create slow motion videos from regular videos"
	code="https://github.com/arm-out/SuperSlowMo"
	href="/projects/SuperSlowMo"
/>

<FeaturedProject
	title="ChartDuels"
	desc="is a single player browser game of higher or lower based on Spotify streaming data"
	live="https://www.chartduels.com/"
	code="https://github.com/arm-out/ChartDuels"
	href="/projects/ChartDuels"
/>
