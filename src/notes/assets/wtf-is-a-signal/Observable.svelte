<script lang="ts">
	let count = 0;
	const increment = () => count++;
</script>

<div class="bg-[#121212] p-6 flex items-center justify-center mb-4">
	<button on:click={increment} class="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
		>The count is: {count}</button
	>
</div>
