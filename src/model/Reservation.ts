export type Reservation = {
	id?: string;
	travel: string;
	passenger: string;
	reservedSpots: number;
	is_paid: boolean;
	is_cancelled: boolean;
	is_confirmed: boolean;
	is_done: boolean;
	isNew: boolean;
};
