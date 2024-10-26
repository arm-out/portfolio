<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	const offset = 8;

	let date = new Date();
	let utc = date.getTime() + date.getTimezoneOffset() * 60000;
	let cur = new Date(utc + 3600000 * offset);
	let curTime = cur.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
			utc = date.getTime() + date.getTimezoneOffset() * 60000;
			cur = new Date(utc + 3600000 * offset);
			curTime = cur.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>About Me</title>
	<meta
		name="description"
		content="Studying Computer Science at the University of California, San Diego. Passionate about technology, music, and design. Consistently improving through learning."
	/>
</svelte:head>

<h1 class="sr-only">About Me</h1>

<p class="pb-4">
	My best days are filled with tasty food, good music, and quality time with friends. My hobbies
	include music production, graphic design and playing basketball.
</p>

<div class="grid grid-cols-2 gap-4 pb-4">
	<enhanced:img src="/static/about/me.png" alt="Me!" />
	<enhanced:img src="/static/about/sunset.jpg" alt="San Diego sunset"></enhanced:img>
</div>

<enhanced:img src="/static/about/grad.jpg" alt="Graduation with friends" />

<h2 class="text-sec mt-8 mb-4">Current Obsessions</h2>
<ul>
	<li>Picking up the violin after 6 years</li>
	<li>Songwriting and production</li>
	<li>League of Legends Worlds</li>
	<li>Grinding chess</li>
</ul>

{#if data.temp && data.code}
	<footer class="mt-24">
		<p>Singapore</p>
		<p>{curTime}, {data.code} at {data.temp} &#8451;</p>
	</footer>
{:else}
	<footer class="mt-24">
		<p>Singapore</p>
		<p>{curTime}</p>
	</footer>
{/if}
