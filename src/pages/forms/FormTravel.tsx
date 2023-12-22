import FormCustom from "../../components/formCustom/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { travelsApi } from "../../api/travelsApi";
import { getUserEmailsID } from "../../api/api";
const path = "/travels";

const {
	usersOptions,
	usersEmails,
	userIds,
}: {
	usersOptions: { value?: string; label: string }[];
	usersEmails: string[];
	userIds: string[];
} = getUserEmailsID(true);

/*
{
 ??"timeTravel": 0,
  "??kmTravel": 0,
*/

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
		id: "startingTimestamp",
		required: true,
	},
	{
		label: "Price Per Spot",
		type: "number",
		id: "costPerSpot",
		required: true,
	},
	{
		label: "id du lieu de départ",
		type: "number",
		id: "startLoc",
		required: true,
	},
	{
		label: "id du lieu d'arrivée",
		type: "number",
		id: "endLoc",
		required: true,
	},
	{
		label: "kilomètres parcourus",
		type: "number",
		id: "kmTravel",
		required: false,
	},
	{
		label: "is cancelled",
		type: "checkbox",
		id: "isCancelled",
		required: false,
	},
	{
		label: "is done",
		type: "checkbox",
		id: "isDone",
		required: false,
	},
	{
		label: "nb of sport available",
		type: "number",
		id: "nbSpots",
		required: true,
	},
];
const baseData = {
	costPerSpot: 0,
	nbSpots: 0,
	startingTimestamp: new Date().getTime(),
	timeTravel: 0,
	kmTravel: 0,
	startLoc: 0,
	endLoc: 0,
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
