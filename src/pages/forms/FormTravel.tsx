import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { travelsApi } from "../../api/travelsApi";
import { getUserEmailsID } from "../../api/authApi";
const path = "/travels";

const {
	usersOptions,
	usersEmails,
	userIds,
}: {
	usersOptions: { value?: string; label: string }[];
	usersEmails: string[];
	userIds: string[];
} = getUserEmailsID();

const Lines: LineOfForm[] = [
	{
		label: "id du conducteur",
		type: "comboboxObject",
		id: "driver",
		required: true,
		options: usersOptions,
		optionsValues: userIds,
		optionsLabels: usersEmails,
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
	departureDate: new Date(),
	availablePlaces: 0,
	pricePerSpot: 0,
	startingLocation: "",
	isNew: true,
};
function FormTravel() {
	return (
		<FormCustom
			lines={Lines}
			path={path}
			baseData={baseData}
			api={travelsApi}
		/>
	);
}

export default FormTravel;
