export type Travel = {
	id?: string;
	driver: string;
	departureDate: Date;
	creationDate?: Date;
	availablePlaces: number;
	pricePerSpot: number;
	startingLocation: string;
	isNew: boolean;
};
