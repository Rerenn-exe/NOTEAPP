export const groups = $state<string[]>([]);

export function addGroup(group: string) {
	groups.push(group);
}

export function deleteGroup(group: string) {
	const index = groups.indexOf(group);

	if (index !== -1) {
		groups.splice(index, 1);
	}
}
