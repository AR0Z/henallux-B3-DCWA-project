import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { travelsApi } from "../../api/travelsApi";

const path = "/travels";
const Lines: LineOfForm[] = [
	{
		label: "id du conducteur",
		type: "email",
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
		label: "id du lieu de départ",
		type: "text",
		id: "startingLocation",
		required: true,
	},
];

const baseData = {
	driver: "",
	departureDate: "",
	availablePlaces: 0,
	pricePerSpot: 0,
	startingLocation: "",
};
function FormTravel() {
	return (
		<FormCustom
			lines={Lines}
			path={path}
			baseData={baseData}
			api={travelsApi}></FormCustom>
	);
}

export default FormTravel;
