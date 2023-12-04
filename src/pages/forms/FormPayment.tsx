import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { paymentsApi } from "../../api/paymentsApi";

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
			type: "number",
			id: "reservation_id",
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
			options: ["pending", "paid", "failed"],
			id: "payment_status",
			required: true,
		},
	];

	function newPayment(data: any) {
		paymentsApi.create({
			amount: parseFloat(data.amount),
			reservation_id: parseInt(data.reservation_id),
			method: data.method,
			payment_status: data.payment_status,
		});
	}

	return (
		<FormCustom lines={Lines} path={path} newData={newPayment}></FormCustom>
	);
}

export default FormPayment;
