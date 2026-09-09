import { SvelteDate } from 'svelte/reactivity';

export type Note = {
	id: string;
	dateCreated: SvelteDate;
	title: string;
	content: string;
	group: string;
	color: string;
};

export const notes = $state<Note[]>([
	{
		id: '1',
		dateCreated: new SvelteDate(),
		title: 'My first note',
		content: 'This is my first note.',
		group: 'Studies',
		color: '#DBEAFE'
	},
	{
		id: '2',
		dateCreated: new SvelteDate(),
		title: 'Shopping list',
		content: 'Milk, eggs, bread',
		group: 'Group 2',
		color: '#FEF3C7'
	},
	{
		id: '3',
		dateCreated: new SvelteDate(),
		title: 'Study notes',
		content: 'Learn Svelte 5 stores.',
		group: 'Group 1',
		color: '#DCFCE7'
	},
	{
		id: '4',
		dateCreated: new SvelteDate(),
		title: 'My first note',
		content: 'This is my first note.',
		group: 'Group 1',
		color: '#FCE7F3'
	},
	{
		id: '5',
		dateCreated: new SvelteDate(),
		title: 'My first note',
		content: 'This is my first note.',
		group: 'Group 1',
		color: '#EDE9FE'
	},
	{
		id: '6',
		dateCreated: new SvelteDate(),
		title: 'My first note',
		content: 'This is my first note.',
		group: 'Group 1',
		color: '#CFFAFE'
	},
	{
		id: '7',
		dateCreated: new SvelteDate(),
		title: 'My first note',
		content: 'This is my first note.',
		group: 'Group 1',
		color: '#FEE2E2'
	},
	{
		id: '8',
		dateCreated: new SvelteDate(),
		title: 'My first note',
		content: 'This is my first note.',
		group: 'Group 1',
		color: '#F3F4F6'
	}
]);
