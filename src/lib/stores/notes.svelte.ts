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

export const notes = $state<Note[]>([
	{
		id: '1',
		dateCreated: new SvelteDate('2026-09-10'),
		title: 'My first note',
		content: 'This is my first note.',
		group: 'Personal',
		color: '#DBEAFE'
	},

	{
		id: '2',
		dateCreated: new SvelteDate('2026-09-11'),
		title: 'Shopping list',
		content: 'Milk, eggs, bread',
		group: 'Shopping',
		color: '#FEF3C7'
	},

	{
		id: '3',
		dateCreated: new SvelteDate('2026-09-11'),
		title: 'Study notes',
		content: 'Learn Svelte 5 stores.',
		group: 'Studies',
		color: '#DCFCE7'
	},

	{
		id: '4',
		dateCreated: new SvelteDate('2026-09-12'),
		title: 'Weekend activities',
		content: 'Go for a walk and watch a movie.',
		group: 'Activities',
		color: '#FCE7F3'
	},

	{
		id: '5',
		dateCreated: new SvelteDate('2026-09-15'),
		title: 'Work tasks',
		content: 'Finish the project documentation.',
		group: 'Work',
		color: '#EDE9FE'
	},

	{
		id: '6',
		dateCreated: new SvelteDate('2026-09-14'),
		title: 'Personal goals',
		content: 'Read a few pages today.',
		group: 'Personal',
		color: '#CFFAFE'
	},

	{
		id: '7',
		dateCreated: new SvelteDate('2026-09-15'),
		title: 'Things to buy',
		content: 'Notebook and new pen.',
		group: 'Shopping',
		color: '#FEE2E2'
	},

	{
		id: '8',
		dateCreated: new SvelteDate('2026-09-11'),
		title: 'Study reminder',
		content: 'Practice Svelte components.',
		group: 'Studies',
		color: '#F3F4F6'
	}
]);

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
