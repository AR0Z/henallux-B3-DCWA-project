export type Payment = {
	id: string;
	amount: number;
	reservation: string;
	method: "CREDIT_CARD" | "PAYPAL";
	status: "PENDING" | "ACCEPTED" | "REFUSED";
};
