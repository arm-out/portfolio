<script lang="ts">
	import { navPath } from '$lib/store';

	navPath.set('/projects');
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="These are some of my personal projects and explorations" />
</svelte:head>

<h1 class="hidden">Projects</h1>
<p class="mb-16">
	These are some of my personal projects and explorations. It's my way to discover useful solutions,
	train my eyes for details, and develop more specific insights in certain topics.
</p>

<div class="flex flex-row gap-2">
	<h3 class="inline-block">Eval-it</h3>
	<span class="text-sec font-light italic">Svelte, Go, Rust</span>
</div>
<p class="text-sec">Lorem ipsum dolor sit amet</p>
