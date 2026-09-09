<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import Edit from 'lucide-svelte/icons/edit';
	import Trash2 from 'lucide-svelte/icons/trash-2';

	import { notes, noteFilter, deleteNote } from '$lib/stores/notes.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	let selectedNote = $state<string | null>(null);
	let holdingNote = $state<string | null>(null);
	let holdTimer: ReturnType<typeof setTimeout>;

	let noteToDelete = $state<string | null>(null);
	let showDeleteDialog = $state(false);

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

	function editNote(id: string) {
		goto(resolve(`/edit-page?id=${id}`));
	}

	function openDeleteDialog(id: string) {
		noteToDelete = id;
		showDeleteDialog = true;
	}

	function closeDeleteDialog() {
		noteToDelete = null;
		showDeleteDialog = false;
	}

	function confirmDelete() {
		if (!noteToDelete) {
			return;
		}

		deleteNote(noteToDelete);

		selectedNote = null;
		closeDeleteDialog();
	}
</script>

<div
	class="grid h-[calc(100vh-18rem)] scrollbar-none auto-rows-min grid-cols-2 gap-4 overflow-y-auto [&::-webkit-scrollbar]:hidden"
>
	{#each filteredNotes as note (note.id)}
		<div
			role="button"
			tabindex="0"
			onpointerdown={() => startHold(note.id)}
			onpointerup={cancelHold}
			onpointerleave={cancelHold}
			style={`background-color: ${note.color}`}
			class={`relative h-48 w-full min-w-0 overflow-hidden rounded-lg p-3 px-5 text-[#393939] transition-all duration-150 ${
				holdingNote === note.id ? 'scale-[0.97] shadow-inner' : 'scale-100'
			}`}
		>
			<!-- Title -->
			<p class="pt-1 text-sm font-semibold wrap-break-word">
				{note.title}
			</p>

			<!-- Content -->
			<p class="mt-2 text-sm leading-5 wrap-break-word whitespace-normal">
				{note.content}
			</p>

			<!-- Edit / Delete -->
			<div
				class={`absolute top-[0.6rem] right-[0.4rem] flex gap-[0.07rem] transition-opacity duration-200 ${
					selectedNote === note.id ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<!-- Edit -->
				<button
					type="button"
					style={`background-color: ${note.color}; border: 1px solid color-mix(in srgb, ${note.color} 90%, gray)`}
					class="flex size-9 items-center justify-center rounded-full text-[#393939]"
					aria-label="Edit note"
					onclick={(event) => {
						event.stopPropagation();
						editNote(note.id);
					}}
				>
					<Edit class="size-4" />
				</button>

				<!-- Delete -->
				<button
					type="button"
					style={`background-color: ${note.color}; border: 1px solid color-mix(in srgb, ${note.color} 90%, gray)`}
					class="flex size-9 items-center justify-center rounded-full text-[#393939]"
					aria-label="Delete note"
					onclick={(event) => {
						event.stopPropagation();
						openDeleteDialog(note.id);
					}}
				>
					<Trash2 class="size-4" />
				</button>
			</div>
		</div>
	{/each}
</div>

<!-- Delete confirmation dialog -->
{#if showDeleteDialog}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-6"
		role="presentation"
		onclick={(event) => {
			if (event.target === event.currentTarget) {
				closeDeleteDialog();
			}
		}}
	>
		<div
			class="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
			role="dialog"
			aria-modal="true"
			aria-labelledby="delete-note-title"
		>
			<!-- Dialog content -->
			<div class="flex flex-col gap-2">
				<h2 id="delete-note-title" class="text-lg font-semibold text-[#393939]">Delete note?</h2>

				<p class="text-sm leading-6 text-gray-500">Are you sure you want to delete this note?</p>
			</div>

			<!-- Dialog buttons -->
			<div class="mt-5 flex justify-end gap-2">
				<button
					type="button"
					class="h-9 rounded-lg px-4 text-sm text-[#393939] hover:bg-gray-100"
					onclick={closeDeleteDialog}
				>
					Cancel
				</button>

				<button
					type="button"
					class="h-9 rounded-lg bg-[#393939] px-4 text-sm text-white hover:bg-[#2f2f2f]"
					onclick={confirmDelete}
				>
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}
