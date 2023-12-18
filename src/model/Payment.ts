export type Payment = {
	id?: string;
	amount: number;
	reservationId: number;
	method?: "CREDIT_CARD" | "PAYPAL";
	status?: "PENDING" | "ACCEPTED" | "REFUSED";
	isNew: boolean;
};
