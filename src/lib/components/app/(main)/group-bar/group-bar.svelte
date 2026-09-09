<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	let groups: string[] = ['All', 'Studies', 'Shopping', 'Activities', 'Personal', 'Work'];

	let selectedGroup = $state('Group 1');
</script>

<div class="flex w-full scrollbar-none gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
	{#each groups as group (group)}
		<Button
			onclick={() => (selectedGroup = group)}
			class={`flex h-7 min-w-12 shrink-0 flex-col gap-[0.2rem] rounded-lg ${
				selectedGroup === group
					? 'bg-[#393939] text-white'
					: 'border-[0.3px] border-[#c9c4c4] bg-white text-[#393939]'
			}`}
		>
			{group}
		</Button>
	{/each}
</div>
