<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { ArrowLeft, Save } from 'lucide-svelte';
	import { addNote } from '$lib/stores/notes.svelte';
	let title = $state('');
	let content = $state('');
	let group = $state('');
	let color = $state('#DBEAFE');

	function handleSave() {
		if (!title.trim() && !content.trim()) {
			return;
		}

		addNote(title.trim(), content.trim(), group, color);

		goto(resolve('/'));
	}
</script>

<div class="mx-6 flex flex-col gap-6">
	<!-- Header -->
	<header class="flex h-16 items-center justify-between">
		<button
			type="button"
			aria-label="Go back"
			class="flex size-10 items-center justify-center"
			onclick={() => goto(resolve('/'))}
		>
			<ArrowLeft class="size-5" strokeWidth={2} />
		</button>

		<button
			type="button"
			aria-label="Save note"
			class="flex size-10 items-center justify-center"
			onclick={handleSave}
		>
			<Save class="size-5" strokeWidth={2} />
		</button>
	</header>

	<!-- Title -->
	<input
		id="note-title"
		name="title"
		type="text"
		bind:value={title}
		placeholder="Title"
		class="w-full border-none bg-transparent text-3xl font-semibold text-[#393939] outline-none placeholder:text-gray-400"
	/>

	<!-- Group -->
	<div class="flex flex-col gap-2">
		<p class="text-sm font-medium text-[#393939]">Group</p>

		<div class="flex flex-wrap gap-2">
			{#each ['No group', 'Personal', 'Shopping', 'Studies', 'Activities', 'Work'] as groupOption (groupOption)}
				<button
					type="button"
					onclick={() => (group = groupOption === 'No group' ? '' : groupOption)}
					class={`flex h-7 min-w-12 shrink-0 items-center justify-center rounded-lg px-3 text-sm ${
						(group === '' && groupOption === 'No group') || group === groupOption
							? 'bg-[#393939] text-white'
							: 'border-[0.3px] border-[#c9c4c4] bg-white text-[#393939]'
					}`}
				>
					{groupOption}
				</button>
			{/each}
		</div>
	</div>

	<!-- Color -->
	<div class="flex flex-col gap-2">
		<p class="text-sm font-medium text-[#393939]">Color</p>

		<div class="flex flex-wrap gap-2">
			{#each [{ name: 'Blue', value: '#DBEAFE' }, { name: 'Yellow', value: '#FEF3C7' }, { name: 'Green', value: '#DCFCE7' }, { name: 'Pink', value: '#FCE7F3' }, { name: 'Purple', value: '#EDE9FE' }, { name: 'Cyan', value: '#CFFAFE' }, { name: 'Red', value: '#FEE2E2' }, { name: 'Gray', value: '#F3F4F6' }] as colorOption (colorOption)}
				<button
					type="button"
					aria-label={`Select ${colorOption.name}`}
					onclick={() => (color = colorOption.value)}
					class={`flex size-8 items-center justify-center rounded-lg ${
						color === colorOption.value
							? 'border-2 border-[#393939]'
							: 'border-[0.3px] border-[#c9c4c4]'
					}`}
				>
					<span class="size-5 rounded-md" style={`background-color: ${colorOption.value}`}></span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Content -->
	<textarea
		id="note-content"
		name="content"
		bind:value={content}
		placeholder="Start writing..."
		class="min-h-125 w-full resize-none border-none bg-transparent text-base leading-7 text-[#393939] outline-none placeholder:text-gray-400"
	></textarea>
</div>
