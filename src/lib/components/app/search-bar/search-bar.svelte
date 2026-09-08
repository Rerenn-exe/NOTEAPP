<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import Search from 'lucide-svelte/icons/search';
</script>

<div class="flex flex-col pt-14">
	<div class="relative w-full">
		<Search class="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#393939]" />

		<Input
			class="h-11 w-full rounded-xl border-[0.5px] border-[#393939]/20 bg-white pl-11 text-sm shadow-none placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#393939]/30"
			placeholder="Search for Notes"
		/>
	</div>
</div>
