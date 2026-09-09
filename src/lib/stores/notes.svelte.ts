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

export function updateNote(
	id: string,
	updates: {
		title?: string;
		content?: string;
		group?: string;
		color?: string;
	}
) {
	const note = notes.find((note) => note.id === id);

	if (!note) {
		return;
	}

	if (updates.title !== undefined) {
		note.title = updates.title;
	}

	if (updates.content !== undefined) {
		note.content = updates.content;
	}

	if (updates.group !== undefined) {
		note.group = updates.group;
	}

	if (updates.color !== undefined) {
		note.color = updates.color;
	}
}

export function deleteNote(id: string) {
	const index = notes.findIndex((note) => note.id === id);

	if (index === -1) {
		return;
	}

	notes.splice(index, 1);
}
