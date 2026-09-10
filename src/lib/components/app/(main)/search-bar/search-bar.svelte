<script lang="ts">
	import Search from 'lucide-svelte/icons/search';
	import X from 'lucide-svelte/icons/x';

	import { noteFilter } from '$lib/stores/notes.svelte';
</script>

<div class="flex flex-col border-[#c9c4c4] pt-8">
	<div class="relative w-full">
		<Search class="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#393939]" />

		<input
			type="text"
			value={noteFilter.searchQuery}
			oninput={(event) => {
				noteFilter.searchQuery = (event.currentTarget as HTMLInputElement).value;
			}}
			class="h-11 w-full rounded-xl border-[0.5px] border-[#c9c4c4] bg-white pr-11 pl-11 text-sm text-[#393939] outline-none placeholder:text-gray-400 focus:border-[#393939]/40 focus:ring-1 focus:ring-[#393939]/30"
			placeholder="Search for Notes"
		/>

		{#if noteFilter.searchQuery}
			<button
				type="button"
				aria-label="Clear search"
				class="absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#393939]"
				onclick={() => {
					noteFilter.searchQuery = '';
				}}
			>
				<X class="size-4" />
			</button>
		{/if}
	</div>
</div>
