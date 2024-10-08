<script lang="ts">
	import { navPath } from '$lib/store';
	import { onMount } from 'svelte';
	import '../app.css';
	import { onNavigate } from '$app/navigation';

	let navMobile;
	let navBtn;
	let btnText;

	let isOpen = false;
	let active = '';

	$: switch ($navPath) {
		case '/projects':
			active = 'Projects';
			break;
		case '/about':
			active = 'About';
			break;
		case '/thoughts':
			active = 'Thoughts';
			break;
		default:
			active = 'Home';
	}

	onNavigate((nav) => {
		if (nav.to?.route.id != '/') {
			navBtn!.click();
		}
	});

	onMount(() => {
		navBtn!.addEventListener('click', function () {
			isOpen = !isOpen; // Toggle the open state
			if (isOpen) {
				navMobile!.classList.add('open'); // Add the class to open the navbar
				btnText!.innerText = 'Close Navigation'; // Change the button text
			} else {
				navMobile!.classList.remove('open'); // Remove the class to close the navbar
				btnText!.innerText = 'Open Navigation'; // Change the button text
			}
		});
	});
</script>

<div
	class="bg-dark text-fg p-5 md:p-9 grid grid-cols-6 md:grid-cols-12 gap-x-4 gap-y-7 text-sm w-full max-w-screen-2xl"
>
	<div id="gradient" class="fixed top-0 left-0 z-10 h-20 w-full lg:hidden"></div>

	<nav
		class="col-span-6 grid grid-cols-6 lg:col-span-2 xl:col-span-4 gap-4 z-20 sticky top-5 md:top-9 lg:flex lg:flex-col lg:gap-1"
	>
		<a class="col-start-1 col-span-3" href="/">Armin Suraj</a>
		<span class="col-start-4 col-span-3 text-sec">Software Engineer</span>
	</nav>

	<div
		class="mb-[52px] md:mt-[-9.5rem] lg:mt-[-12.4rem] col-span-6 row-start-2 lg:col-start-3 lg:col-span-5 xl:col-span-4 xl:col-start-5"
	>
		<slot />
	</div>

	<div
		class="col-start-9 col-span-4 lg:col-span-3 lg:col-start-10 xl:col-span-2 xl:col-start-11 hidden md:block z-20 sticky top-5 md:top-9"
	>
		<ul class="text-sec flex flex-col gap-2">
			<li>
				<a
					href="/projects"
					class="flex items-center justify-between hover:text-fg {active === 'Projects' &&
						'text-fg'}"><span>Projects</span> <span>12 projects</span></a
				>
			</li>
			<li>
				<a
					href="/about"
					class="flex items-center justify-between hover:text-fg {active === 'About' && 'text-fg'}"
					><span>About</span> <span>22 years</span></a
				>
			</li>
			<li>
				<a
					href="/thoughts"
					class="flex items-center justify-between hover:text-fg {active === 'Thoughts' &&
						'text-fg'}"><span>Thoughts</span> <span>0 entries</span></a
				>
			</li>
		</ul>

		<hr class="w-full my-2 h-[1px] bg-outline border-0" />

		<ul>
			<ul class="text-sec flex flex-col gap-2">
				<li><a href="/resume" class=" hover:text-fg">Resume</a></li>
				<li>
					<a href="https://github.com/arm-out" target="_blank" class=" hover:text-fg">Github</a>
				</li>
				<li><a href="/contact" class=" hover:text-fg">Contact</a></li>
			</ul>
		</ul>
	</div>

	<nav
		id="nav-mobile"
		bind:this={navMobile}
		class="fixed bottom-0 left-0 w-full border-t border-outline bg-dark z-20 md:hidden"
	>
		<button id="nav-btn" bind:this={navBtn} class="p-4 w-full flex items-center justify-between">
			<span class="text-sec">{$navPath}</span>
			<span class="flex items-center gap-2"
				><span bind:this={btnText}>Open Navigation</span>
				<svg
					width="16"
					height="11"
					viewBox="0 0 16 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path fill-rule="evenodd" clip-rule="evenodd" d="M16 1H0V0H16V1Z" fill="currentColor"
					></path><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M16 6H0V5H16V6Z"
						fill="currentColor"
					></path><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M16 11H0V10H16V11Z"
						fill="currentColor"
					></path></svg
				></span
			>
		</button>

		<ul class="p-4 text-sec flex flex-col gap-2">
			<li>
				<a
					href="/projects"
					class="flex items-center justify-between hover:text-fg {active === 'Projects' &&
						'text-fg'}"><span>Projects</span> <span>12 projects</span></a
				>
			</li>
			<li>
				<a
					href="/about"
					class="flex items-center justify-between hover:text-fg {active === 'About' && 'text-fg'}"
					><span>About</span> <span>22 years</span></a
				>
			</li>
			<li>
				<a
					href="/thoughts"
					class="flex items-center justify-between hover:text-fg {active === 'Thoughts' &&
						'text-fg'}"><span>Thoughts</span> <span>0 entries</span></a
				>
			</li>
		</ul>

		<hr class="w-[calc(100%-2rem)] my-2 mx-4 h-[1px] bg-outline border-0" />

		<ul>
			<ul class="p-4 text-sec flex flex-col gap-2">
				<li><a href="/resume" class=" hover:text-fg">Resume</a></li>
				<li>
					<a href="https://github.com/arm-out" target="_blank" class=" hover:text-fg">Github</a>
				</li>
				<li><a href="/contact" class=" hover:text-fg">Contact</a></li>
			</ul>
		</ul>
	</nav>
</div>

<style>
	#nav-mobile {
		transition: transform 0.2s ease-in-out;
		transform: translateY(calc(100% - 52px));
	}

	:global(#nav-mobile.open) {
		transform: translateY(0);
	}

	#gradient {
		background-image: linear-gradient(
			180deg,
			#0f0f0f,
			hsla(0, 0%, 6%, 0.99) 11.79%,
			hsla(0, 0%, 6%, 0.97) 21.38%,
			hsla(0, 0%, 6%, 0.93) 29.12%,
			hsla(0, 0%, 6%, 0.88) 35.34%,
			hsla(0, 0%, 6%, 0.82) 40.37%,
			hsla(0, 0%, 6%, 0.75) 44.56%,
			hsla(0, 0%, 6%, 0.67) 48.24%,
			hsla(0, 0%, 6%, 0.59) 51.76%,
			hsla(0, 0%, 6%, 0.5) 55.44%,
			hsla(0, 0%, 6%, 0.41) 59.63%,
			hsla(0, 0%, 6%, 0.33) 64.66%,
			hsla(0, 0%, 6%, 0.24) 70.88%,
			hsla(0, 0%, 6%, 0.15) 78.62%,
			hsla(0, 0%, 6%, 0.07) 88.21%,
			hsla(0, 0%, 6%, 0)
		);
	}
</style>
