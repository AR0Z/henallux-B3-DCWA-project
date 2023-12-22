export type Travel = {
	id?: number;
	driver?: number;
	startLoc?: number;
	endLoc?: number;
	costPerSpot: number;
	nbSpots: number;
	startingTimestamp: number;
	timeTravel: number;
	kmTravel: number;
	isCancelled?: boolean;
};
