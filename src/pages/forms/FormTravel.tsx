import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";


function FormTravel() {
	const path = "/travels";
	const Lines: LineOfForm[] = [
		{
			label: "Driver",
			type: "text",
			id: "driver",
			required: true,
		},
		{
			label: "Departure Date",
			type: "date",
			id: "departureDate",
			required: true,
		},
		{
			label: "Available Places",
			type: "number",
			id: "availablePlaces",
			required: true,
		},
		{
			label: "Price Per Spot",
			type: "number",
			id: "pricePerSpot",
			required: true,
		},
		{
			label: "Starting Location",
			type: "text",
			id: "startingLocation",
			required: true,
		},
	];

	return <FormCustom lines={Lines} path={path}></FormCustom>;
}

export default FormTravel;
