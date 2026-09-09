<script lang="ts">
	import SearchBar from '$lib/components/app/(main)/search-bar/search-bar.svelte';
	import DateBar from '$lib/components/app/(main)/date-bar/date-bar.svelte';
	import GroupBar from '$lib/components/app/(main)/group-bar/group-bar.svelte';
	import Notes from '$lib/components/app/(main)/notes/notes.svelte';
	import AddButton from '$lib/components/app/(main)/add-button/add-button.svelte';
</script>

<div class="mx-6 flex flex-col gap-6">
	<SearchBar />
	<DateBar />
	<GroupBar />
	<Notes />
	<AddButton />
</div>
