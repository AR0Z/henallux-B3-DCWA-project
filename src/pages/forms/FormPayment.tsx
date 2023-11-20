import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";

// id: string;
// amount: number;
// reservation: string;
// method: "CREDIT_CARD" | "PAYPAL";
// status: "PENDING" | "ACCEPTED" | "REFUSED";

function FormPayment() {
	const path = "/payments";
	const Lines: LineOfForm[] = [
		{
			label: "amount",
			type: "number",
			id: "amount",
			required: true,
		},
		{
			label: "reservation",
			type: "text",
			id: "reservation",
			required: true,
		},
		{
			label: "method",
			type: "combobox",
			options: ["CREDIT_CARD", "PAYPAL"],
			id: "method",
			required: true,
		},
		{
			label: "status",
			type: "combobox",
			options: ["PENDING", "ACCEPTED", "REFUSED"],
			id: "status",
			required: true,
		},
	];

	return <FormCustom lines={Lines} path={path}></FormCustom>;
}

export default FormPayment;
