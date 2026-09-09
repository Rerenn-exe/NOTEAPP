<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { ArrowLeft, Save } from 'lucide-svelte';

	let { onSave }: { onSave: () => void } = $props();
</script>

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
		onclick={onSave}
	>
		<Save class="size-5" strokeWidth={2} />
	</button>
</header>
