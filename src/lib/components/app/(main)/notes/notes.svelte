<script lang="ts">
	import Edit from 'lucide-svelte/icons/edit';
	import Trash2 from 'lucide-svelte/icons/trash-2';

	let notes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	let selectedNote = $state<number | null>(null);
	let holdingNote = $state<number | null>(null);
	let holdTimer: ReturnType<typeof setTimeout>;

	function startHold(note: number) {
		holdingNote = note;

		holdTimer = setTimeout(() => {
			selectedNote = note;
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
	{#each notes as note (note)}
		<div
			role="button"
			tabindex="0"
			onpointerdown={() => startHold(note)}
			onpointerup={cancelHold}
			onpointerleave={cancelHold}
			class={`relative min-h-48 w-full rounded-lg bg-blue-100/70 p-3 px-5 text-[#393939] transition-all duration-150 ${
				holdingNote === note ? 'scale-[0.97] shadow-inner' : 'scale-100'
			}`}
		>
			<p class="text-sm font-semibold">Note {note}</p>

			<div
				class={`absolute top-[0.6rem] right-[0.7rem] flex gap-[0.18rem] transition-opacity duration-200 ${
					selectedNote === note ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<button class="rounded-md p-1 text-[#393939]" aria-label="Edit note">
					<Edit class="size-4" />
				</button>

				<button class="rounded-md p-1 text-[#393939]" aria-label="Delete note">
					<Trash2 class="size-4" />
				</button>
			</div>
		</div>
	{/each}
</div>
