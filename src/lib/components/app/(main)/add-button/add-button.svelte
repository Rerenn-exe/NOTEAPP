<script lang="ts">
	import Plus from 'lucide-svelte/icons/plus';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
</script>

<button
	onclick={() => goto(resolve('/add-page'))}
	class="font-lg absolute right-8 bottom-8 mx-auto flex h-22 w-22 items-center justify-center rounded-full bg-[#393939] shadow-md"
>
	<Plus class="size-10 text-white" />
</button>
