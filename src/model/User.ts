export type User = {
	id?: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	isDriver: boolean;
	isAdmin: boolean;
	phone: string;
	description: string;
	vehicle?: string;
	plateNumber?: string;
	isNew: boolean;
};
