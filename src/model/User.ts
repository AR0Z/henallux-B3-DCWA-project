export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	isDriver: boolean;
	nbStars: number;
	password: string;
	phoneNumber: string;
	description: string;
	vehicle?: string;
	plateNumber?: string;
};
