export type Location = {
	id?: string;
	label: string;
	latitude: number;
	longitude: number;
	nextStopsId: string | null;
	isNew: boolean;
};
