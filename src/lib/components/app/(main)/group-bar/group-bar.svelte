<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { noteFilter } from '$lib/stores/notes.svelte';
	import { groups } from '$lib/stores/groups.svelte';
</script>

<div class="flex w-full scrollbar-none gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
	{#each ['All', ...groups] as group (group)}
		<Button
			onclick={() => (noteFilter.selectedGroup = group)}
			class={`flex h-8 min-w-12 shrink-0 flex-col gap-[0.2rem] rounded-xl ${
				noteFilter.selectedGroup === group
					? 'bg-[#393939] text-white'
					: 'border-[0.3px] border-[#c9c4c4] bg-white text-[#393939]'
			}`}
		>
			{group}
		</Button>
	{/each}
</div>
