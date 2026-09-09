<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	import { notes, updateNote } from '$lib/stores/notes.svelte';

	import Navigation from '$lib/components/app/(add-page)/navigation.svelte';
	import GroupSelector from '$lib/components/app/(add-page)/group-selector.svelte';
	import ColorSelector from '$lib/components/app/(add-page)/color-selector.svelte';
	import GroupCreation from '$lib/components/app/(add-page)/group-creation.svelte';

	let title = $state('');
	let content = $state('');
	let group = $state('');
	let color = $state('#DBEAFE');

	let showGroupDialog = $state(false);
	let noteFound = $state(true);

	const noteId = $derived(page.url.searchParams.get('id'));

	$effect(() => {
		if (!noteId) {
			noteFound = false;
			return;
		}

		const note = notes.find((note) => note.id === noteId);

		if (!note) {
			noteFound = false;
			return;
		}

		noteFound = true;

		title = note.title;
		content = note.content;
		group = note.group;
		color = note.color;
	});

	function handleSave() {
		if (!noteId) {
			return;
		}

		if (!title.trim() && !content.trim()) {
			return;
		}

		const note = notes.find((note) => note.id === noteId);

		if (!note) {
			return;
		}

		updateNote(noteId, {
			title: title.trim(),
			content: content.trim(),
			group,
			color
		});

		goto(resolve('/'));
	}

	function openGroupDialog() {
		showGroupDialog = true;
	}

	function closeGroupDialog() {
		showGroupDialog = false;
	}

	function handleGroupCreated(newGroup: string) {
		group = newGroup;
	}

	function handleGroupChange(newGroup: string) {
		group = newGroup;
	}

	function handleColorChange(newColor: string) {
		color = newColor;
	}
</script>

{#if noteFound}
	<div class="min-h-screen transition-colors duration-200" style={`background-color: ${color}`}>
		<div class="mx-6 flex flex-col gap-6">
			<!-- Header -->
			<Navigation onSave={handleSave} />

			<!-- Title -->
			<input
				id="note-title"
				name="title"
				type="text"
				bind:value={title}
				placeholder="Title"
				class="w-full border-none bg-transparent text-3xl font-semibold text-[#393939] outline-none placeholder:text-gray-500"
			/>

			<!-- Group -->
			<GroupSelector
				{group}
				{color}
				onGroupChange={handleGroupChange}
				onAddGroup={openGroupDialog}
			/>

			<!-- Color -->
			<ColorSelector {color} onColorChange={handleColorChange} />

			<!-- Content -->
			<textarea
				id="note-content"
				name="content"
				bind:value={content}
				placeholder="Start writing..."
				class="min-h-125 w-full resize-none border-none bg-transparent text-base leading-7 text-[#393939] outline-none placeholder:text-gray-500"
			></textarea>
		</div>

		<!-- Create Group Dialog -->
		<GroupCreation
			open={showGroupDialog}
			onClose={closeGroupDialog}
			onGroupCreated={handleGroupCreated}
		/>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center bg-gray-50">
		<div class="text-center">
			<p class="text-lg font-medium text-[#393939]">Note not found</p>

			<button
				type="button"
				class="mt-4 rounded-lg bg-[#393939] px-4 py-2 text-sm text-white"
				onclick={() => goto(resolve('/'))}
			>
				Go back
			</button>
		</div>
	</div>
{/if}
