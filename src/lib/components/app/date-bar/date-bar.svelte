<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	const dates = Array.from({ length: 6 }, (_, i) => {
		const date = new SvelteDate();
		date.setDate(date.getDate() + i);
		return date;
	});
</script>

<div class="flex w-full gap-4">
	{#each dates as date, i (date.toISOString())}
		<Button
			class={`flex h-20 flex-1 flex-col gap-[0.2rem] rounded-xl bg-[#393939] ${
				i === 0
					? 'bg-[#393939] text-white'
					: 'border-[0.3px] border-[#393939] bg-white text-[#393939]'
			}`}
		>
			<span class="text-xs">
				{date.toLocaleDateString('en-US', {
					weekday: 'short'
				})}
			</span>

			<span class="text-2xl font-bold">
				{date.getDate()}
			</span>

			<span class="text-xs">
				{date.toLocaleDateString('en-US', {
					month: 'short'
				})}
			</span>
		</Button>
	{/each}
</div>
