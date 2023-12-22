export type Reservation = {
	id?: string;
	travelId: number;
	passengerId: number;
	nbSpots: number;
	cost?: number;
	locationTravel?: number;
	starConductor?: number;
	starPassenger?: number;
	isPaid?: boolean;
	isCancelled: boolean;
	bookingStatus: "pending" | "accepted" | "refused";
};
