import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { reservationsApi } from "../../api/reservationsApi";

const path = "/reservations";
const Lines: LineOfForm[] = [
	{
		label: "Travel (id)",
		id: "travel",
		type: "text",
		required: false,
	},
	{
		label: "Passenger",
		id: "passenger",
		type: "text",
		required: false,
	},
	{
		label: "Reserved Spots",
		id: "reservedSpots",
		type: "number",
		required: false,
	},
	{
		label: "Paid ?",
		id: "is_paid",
		type: "checkbox",
		required: true,
	},
	{
		label: "Cancelled ?",
		id: "is_cancelled",
		type: "checkbox",
		required: true,
	},
	{
		label: "Confirmed ?",
		id: "is_confirmed",
		type: "checkbox",
		required: true,
	},
	{
		label: "Done ?",
		id: "is_done",
		type: "checkbox",
		required: true,
	},
];
const baseData = {
	travel: "",
	passenger: "",
	reservedSpots: 0,
	is_paid: false,
	is_cancelled: false,
	is_confirmed: false,
	is_done: false,
};
function FormReservation() {
	return (
		<FormCustom
			lines={Lines}
			path={path}
			baseData={baseData}
			api={reservationsApi}></FormCustom>
	);
}

export default FormReservation;
