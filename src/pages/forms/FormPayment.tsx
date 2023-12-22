import FormCustom from "../../components/formCustom/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { paymentsApi } from "../../api/paymentsApi";

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
const baseData = {
	amount: 0,
	reservationId: 0,
	isNew: true,
};
function FormPayment() {
	return (
		<FormCustom
			lines={Lines}
			path={path}
			baseData={baseData}
			api={paymentsApi}
		/>
	);
}

export default FormPayment;
