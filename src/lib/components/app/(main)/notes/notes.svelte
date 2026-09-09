<script lang="ts">
	import Edit from 'lucide-svelte/icons/edit';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import { notes, noteFilter } from '$lib/stores/notes.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	let selectedNote = $state<string | null>(null);
	let holdingNote = $state<string | null>(null);
	let holdTimer: ReturnType<typeof setTimeout>;

	let filteredNotes = $derived(
		notes.filter((note) => {
			const matchesGroup =
				noteFilter.selectedGroup === 'All' || note.group === noteFilter.selectedGroup;

			const noteDate = new SvelteDate(note.dateCreated);

			const matchesDate =
				noteFilter.selectedDates.length === 0 ||
				noteFilter.selectedDates.some(
					(selectedDate) => noteDate.toDateString() === selectedDate.toDateString()
				);

			return matchesGroup && matchesDate;
		})
	);

	function startHold(id: string) {
		holdingNote = id;

		holdTimer = setTimeout(() => {
			selectedNote = id;
		}, 500);
	}

	function cancelHold() {
		clearTimeout(holdTimer);
		holdingNote = null;
	}
</script>

<div
	class="grid h-[calc(100vh-18rem)] scrollbar-none grid-cols-2 gap-4 overflow-y-auto [&::-webkit-scrollbar]:hidden"
>
	{#each filteredNotes as note (note.id)}
		<div
			role="button"
			tabindex="0"
			onpointerdown={() => startHold(note.id)}
			onpointerup={cancelHold}
			onpointerleave={cancelHold}
			style={`background-color: ${note.color}`}
			class={`relative max-h-48 min-h-48 w-full overflow-hidden rounded-lg p-3 px-5 text-[#393939] transition-all duration-150 ${
				holdingNote === note.id ? 'scale-[0.97] shadow-inner' : 'scale-100'
			}`}
		>
			<!-- Title -->
			<p class="pt-1 text-sm font-semibold">{note.title}</p>

			<!-- Content -->
			<p class="mt-2 text-sm">{note.content}</p>

			<!-- Edit / Delete -->
			<div
				class={`absolute top-[0.6rem] right-[0.4rem] flex gap-[0.07rem] transition-opacity duration-200 ${
					selectedNote === note.id ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<button
					style={`background-color: ${note.color}; border: 1px solid color-mix(in srgb, ${note.color} 90%, gray)`}
					class="flex size-9 items-center justify-center rounded-full text-[#393939]"
					aria-label="Edit note"
				>
					<Edit class="size-4" />
				</button>

				<button
					style={`background-color: ${note.color}; border: 1px solid color-mix(in srgb, ${note.color} 90%, gray)`}
					class="flex size-9 items-center justify-center rounded-full text-[#393939]"
					aria-label="Delete note"
				>
					<Trash2 class="size-4" />
				</button>
			</div>
		</div>
	{/each}
</div>
