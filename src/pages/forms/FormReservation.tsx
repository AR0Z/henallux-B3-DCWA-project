import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { reservationsApi } from "../../api/reservationsApi";
import { getUserEmailsID } from "../../api/authApi";

const path = "/reservations";

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
		label: "Travel (id)",
		id: "travel",
		type: "text",
		required: false,
	},
	{
		label: "Passenger",
		id: "passenger",
		type: "comboboxObject",
		required: false,
		options: usersOptions,
		optionsValues: userIds,
		optionsLabels: usersEmails,
	},
	{
		label: "Reserved Spots",
		id: "reservedSpots",
		type: "number",
		required: false,
	},
	{
		label: "Paid ?",
		id: "isPaid",
		type: "checkbox",
		required: true,
	},
	{
		label: "Cancelled ?",
		id: "isCancelled",
		type: "checkbox",
		required: true,
	},
	{
		label: "Confirmed ?",
		id: "isConfirmed",
		type: "checkbox",
		required: true,
	},
	{
		label: "Done ?",
		id: "isDone",
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
	isNew: true,
};

function FormReservation() {
	return (
		<FormCustom
			lines={Lines}
			path={path}
			baseData={baseData}
			api={reservationsApi}
		/>
	);
}

export default FormReservation;
