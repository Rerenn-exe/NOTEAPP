<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { addNote } from '$lib/stores/notes.svelte';
	import Navigation from '$lib/components/app/(add-page)/navigation.svelte';
	import GroupSelector from '$lib/components/app/(add-page)/group-selector.svelte';
	import ColorSelector from '$lib/components/app/(add-page)/color-selector.svelte';
	import GroupCreation from '$lib/components/app/(add-page)/group-creation.svelte';

	let title = $state('');
	let content = $state('');
	let group = $state('');
	let color = $state('#DBEAFE');

	let showGroupDialog = $state(false);

	function handleSave() {
		if (!title.trim() && !content.trim()) {
			return;
		}

		addNote(title.trim(), content.trim(), group, color);

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
</script>

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
			onGroupChange={(newGroup) => (group = newGroup)}
			onAddGroup={openGroupDialog}
		/>

		<!-- Color -->
		<ColorSelector {color} onColorChange={(newColor) => (color = newColor)} />

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
