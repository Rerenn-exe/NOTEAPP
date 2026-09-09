<script lang="ts">
	import { Plus, X } from 'lucide-svelte';

	import { groups, deleteGroup } from '$lib/stores/groups.svelte';

	let {
		group,
		color,
		onGroupChange,
		onAddGroup
	}: {
		group: string;
		color: string;
		onGroupChange: (group: string) => void;
		onAddGroup: () => void;
	} = $props();

	let activeGroup = $state('');
	let groupToDelete = $state('');
	let showDeleteDialog = $state(false);

	function handleGroupClick(groupOption: string) {
		onGroupChange(groupOption);

		// Show the X inside the clicked group
		activeGroup = groupOption;
	}

	function openDeleteDialog(groupOption: string) {
		groupToDelete = groupOption;
		showDeleteDialog = true;
	}

	function closeDeleteDialog() {
		groupToDelete = '';
		showDeleteDialog = false;
	}

	function confirmDelete() {
		if (!groupToDelete) {
			return;
		}

		deleteGroup(groupToDelete);

		// If the deleted group was selected,
		// switch back to No group.
		if (group === groupToDelete) {
			onGroupChange('');
		}

		activeGroup = '';
		closeDeleteDialog();
	}
</script>

<div class="flex flex-col gap-2">
	<p class="text-sm font-medium text-[#393939]">Group</p>

	<div class="flex flex-wrap gap-2">
		<!-- No group -->
		<button
			type="button"
			onclick={() => {
				onGroupChange('');
				activeGroup = '';
			}}
			class={`flex h-7 min-w-12 shrink-0 items-center justify-center rounded-lg px-3 text-sm ${
				group === '' ? 'bg-[#393939] text-white' : 'border-[0.3px] border-[#c9c4c4] text-[#393939]'
			}`}
			style={group === '' ? '' : `background-color: color-mix(in srgb, ${color} 45%, white)`}
		>
			No group
		</button>

		<!-- Groups -->
		{#each groups as groupOption (groupOption)}
			<button
				type="button"
				onclick={() => handleGroupClick(groupOption)}
				class={`flex h-7 shrink-0 items-center justify-center rounded-lg text-sm ${
					group === groupOption
						? 'bg-[#393939] text-white'
						: 'border-[0.3px] border-[#c9c4c4] text-[#393939]'
				} ${activeGroup === groupOption ? 'gap-1 pr-1 pl-3' : 'px-3'}`}
				style={group === groupOption
					? ''
					: `background-color: color-mix(in srgb, ${color} 45%, white)`}
			>
				<span>{groupOption}</span>

				<!-- X inside the group -->
				{#if activeGroup === groupOption}
					<span
						role="presentation"
						class="flex size-5 items-center justify-center rounded-full hover:bg-white/10"
						onclick={(event) => {
							event.stopPropagation();
							openDeleteDialog(groupOption);
						}}
					>
						<X class="size-3.5" strokeWidth={2} />
					</span>
				{/if}
			</button>
		{/each}

		<!-- Add group -->
		<button
			type="button"
			aria-label="Add group"
			class="flex size-7 shrink-0 items-center justify-center rounded-lg border-[0.3px] border-[#c9c4c4] bg-white text-[#393939] hover:bg-gray-50"
			onclick={onAddGroup}
		>
			<Plus class="size-4" strokeWidth={2} />
		</button>
	</div>
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
			aria-labelledby="delete-group-title"
		>
			<!-- Dialog content -->
			<div class="flex flex-col gap-2">
				<h2 id="delete-group-title" class="text-lg font-semibold text-[#393939]">Delete group?</h2>

				<p class="text-sm leading-6 text-gray-500">
					Are you sure you want to delete
					<span class="font-medium text-[#393939]">
						{groupToDelete}
					</span>
					?
				</p>
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
