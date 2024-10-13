<script lang="ts">
	import { fade } from 'svelte/transition';

	export let title: string;
	export let desc: string;
	export let live: string = '';
	export let code: string = '';
	export let href: string = '';
	export let i: number;
	export let external: boolean;

	let delay = external ? i * 0.2 : 0.8 + i * 0.2;
</script>

<div style="--delay:{delay}s;" class="fade opacity-0">
	<div class="mb-6">
		<p class="mb-2 text-sec">
			<a
				class="underline decoration-arm decoration-1 underline-offset-[3px] hover:bg-arm text-white"
				{href}>{title}</a
			>
			{desc}
		</p>
		<div class="flex gap-4">
			{#if code}
				<a class="text-sec text-xs flex items-center gap-1.5" href={live} target="_blank"
					>Code
					<span class="w-3.5 h-3.5 p-0.5 bg-arm flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							fill="white"
							viewBox="0 0 256 256"
							class="shrink-0 text-gray-12"
							><path
								d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"
							></path></svg
						>
					</span>
				</a>
			{/if}

			{#if live}
				<a class="text-sec text-xs flex items-center gap-1.5" href={live} target="_blank"
					>Live
					<span class="w-3.5 h-3.5 p-0.5 bg-arm flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							fill="white"
							viewBox="0 0 256 256"
							class="shrink-0 text-gray-12"
							><path
								d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"
							></path></svg
						>
					</span>
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.fade {
		animation: fadeIn 0.3s linear;
		animation-delay: var(--delay);
		animation-fill-mode: forwards;
	}
</style>
