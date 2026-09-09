import { SvelteDate } from 'svelte/reactivity';

export type Note = {
	id: string;
	dateCreated: SvelteDate;
	title: string;
	content: string;
	group: string;
	color: string;
};

export const noteFilter = $state({
	selectedGroup: 'All',
	selectedDates: [] as SvelteDate[]
});

export const notes = $state<Note[]>([]);

export function addNote(
	title: string,
	content: string,
	group: string = 'Personal',
	color: string = '#DBEAFE'
) {
	const newNote: Note = {
		id: crypto.randomUUID(),
		dateCreated: new SvelteDate(),
		title,
		content,
		group,
		color
	};

	notes.push(newNote);
}
