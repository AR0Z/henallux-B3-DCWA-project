export type Reservation = {
	id: string;
	travel: string;
	passenger: string;
	reservedSpots: number;
	status: "PENDING" | "ACCEPTED" | "REFUSED";
};
