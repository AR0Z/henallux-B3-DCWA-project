export type Payment = {
	id?: string;
	amount: number;
	reservationId: number;
	method?: "card" | "paypal";
	paymentStatus?: "pending" | "accepted" | "refused";
	isNew: boolean;
};
