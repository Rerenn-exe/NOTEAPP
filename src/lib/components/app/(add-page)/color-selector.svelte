<script lang="ts">
	import { colors } from '$lib/stores/color.svelte';

	let {
		color,
		onColorChange
	}: {
		color: string;
		onColorChange: (color: string) => void;
	} = $props();
</script>

<div class="flex flex-col gap-2">
	<p class="text-sm font-medium text-[#393939]">Color</p>

	<div class="flex flex-wrap gap-2">
		{#each colors as colorOption (colorOption.value)}
			<button
				type="button"
				aria-label={`Select ${colorOption.name}`}
				onclick={() => onColorChange(colorOption.value)}
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
