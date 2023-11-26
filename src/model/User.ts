export type User = {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	is_driver: boolean;
	is_admin: boolean;
	nbStars: number;
	phone: string;
	description: string;
	vehicle?: string;
	plateNumber?: string;
	isNew?: boolean;
};
