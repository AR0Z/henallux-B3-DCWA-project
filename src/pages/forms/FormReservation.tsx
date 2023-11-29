import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { reservationsApi } from "../../api/reservationsApi";

function FormReservation() {
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

	function newReservation(data: any) {
		reservationsApi.create(data);
	}

	return (
		<FormCustom lines={Lines} path={path} newData={newReservation}></FormCustom>
	);
}

export default FormReservation;
