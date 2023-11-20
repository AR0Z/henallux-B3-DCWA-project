import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";

/*

	id: string;
	travel: string;
	passenger: string;
	reservedSpots: number;
	status: "PENDING" | "ACCEPTED" | "REFUSED";
*/

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
			label: "Status",
			id: "status",
			type: "combobox",
			options: ["PENDING", "ACCEPTED", "REFUSED"],
			required: true,
		},
	];

	return <FormCustom lines={Lines} path={path}></FormCustom>;
}

export default FormReservation;
