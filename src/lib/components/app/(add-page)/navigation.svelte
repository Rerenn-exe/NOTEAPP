<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { ArrowLeft, Save } from 'lucide-svelte';

	let { onSave }: { onSave: () => void } = $props();
</script>

<header class="justify-betweenpx flex h-16 justify-between px-[0.20rem] pt-8">
	<!-- Back button: top-left -->
	<button
		type="button"
		aria-label="Go back"
		class="flex size-7 items-center justify-center"
		onclick={() => goto(resolve('/'))}
	>
		<ArrowLeft class="size-12 text-[#5E5D5D]" />
	</button>

	<!-- Save button: top-right -->
	<button
		type="button"
		aria-label="Save note"
		class="flex size-7 items-center justify-center"
		onclick={onSave}
	>
		<Save class="size-7 text-[#393939]" />
	</button>
</header>
