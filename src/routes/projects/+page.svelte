<script lang="ts">
	import { navPath } from '$lib/store';

	navPath.set('/projects');

	const projects = [
		{
			name: 'test1',
			languages: ['Svelte', 'SvelteKit', 'React'],
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
			slug: 'test1'
		},
		{
			name: 'test2 fds',
			languages: ['Svelte', 'Go', 'Rust'],
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
			slug: 'test1'
		},
		{
			name: 'test3 dsijsd',
			languages: ['Typescript', 'Haskell'],
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
			slug: 'test1'
		},
		{
			name: 'test4',
			languages: ['React Native', 'Python'],
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
			slug: 'test1'
		}
	];

	// set of unique languages
	const languages = new Set<string>();
	projects.forEach((p) => p.languages.forEach((l) => languages.add(l)));

	let checked: string[] = [];
	let all = checked.length === 0;
	$: all = checked.length === 0;

	$: console.log(checked);
	$: console.log(all);
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

{#each projects as p}
	{#if all || p.languages.some((l) => checked.includes(l))}
		<div class="mb-6 hover:bg-sec/5">
			<a href="/projects/{p.slug}">
				<div class="flex flex-row gap-3 pb-1">
					<h3 class="inline-block underline decoration-arm decoration-1 underline-offset-[3px]">
						{p.name}
					</h3>
					<span class="text-sec font-light italic">{p.languages.join(', ')}</span>
				</div>
				<p class="text-sec">{p.desc}</p>
			</a>
		</div>
	{/if}
{/each}
