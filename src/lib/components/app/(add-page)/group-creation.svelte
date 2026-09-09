<script lang="ts">
	import { X } from 'lucide-svelte';
	import { groups, addGroup } from '$lib/stores/groups.svelte';

	let {
		open,
		onClose,
		onGroupCreated
	}: {
		open: boolean;
		onClose: () => void;
		onGroupCreated: (group: string) => void;
	} = $props();

	let newGroupName = $state('');

	function closeDialog() {
		newGroupName = '';
		onClose();
	}

	function handleAddGroup() {
		const trimmedName = newGroupName.trim();

		if (!trimmedName) {
			return;
		}

		if (groups.includes(trimmedName)) {
			return;
		}

		addGroup(trimmedName);

		onGroupCreated(trimmedName);

		newGroupName = '';
		onClose();
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-6"
		role="presentation"
		onclick={(event) => {
			if (event.target === event.currentTarget) {
				closeDialog();
			}
		}}
	>
		<div
			class="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
			role="dialog"
			aria-modal="true"
			aria-labelledby="group-dialog-title"
		>
			<!-- Dialog header -->
			<div class="mb-5 flex items-center justify-between">
				<h2 id="group-dialog-title" class="text-lg font-semibold text-[#393939]">Create group</h2>

				<button
					type="button"
					aria-label="Close"
					class="flex size-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
					onclick={closeDialog}
				>
					<X class="size-5" strokeWidth={2} />
				</button>
			</div>

			<!-- Group name -->
			<div class="flex flex-col gap-2">
				<label for="group-name" class="text-sm font-medium text-[#393939]"> Group name </label>

				<input
					id="group-name"
					name="groupName"
					type="text"
					bind:value={newGroupName}
					placeholder="Enter group name"
					class="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-[#393939] outline-none focus:border-[#393939]"
					onkeydown={(event) => {
						if (event.key === 'Enter') {
							handleAddGroup();
						}
					}}
				/>
			</div>

			<!-- Dialog buttons -->
			<div class="mt-5 flex justify-end gap-2">
				<button
					type="button"
					class="h-9 rounded-lg px-4 text-sm text-[#393939] hover:bg-gray-100"
					onclick={closeDialog}
				>
					Cancel
				</button>

				<button
					type="button"
					class="h-9 rounded-lg bg-[#393939] px-4 text-sm text-white hover:bg-[#2f2f2f]"
					onclick={handleAddGroup}
				>
					Create
				</button>
			</div>
		</div>
	</div>
{/if}
