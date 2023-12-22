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
		id: "reservationId",
		required: true,
	},
	{
		label: "method",
		type: "combobox",
		options: ["card", "paypal"],
		id: "method",
		required: true,
	},
	{
		label: "status of payment",
		type: "combobox",
		options: ["pending", "paid", "failed"],
		id: "paymentStatus",
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
