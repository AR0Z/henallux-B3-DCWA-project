import FormCustom from "../../components/formCustom/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { reservationsApi } from "../../api/reservationsApi";
import { getUserEmailsID } from "../../api/api";
import { Reservation } from "model/Reservation";

const path = "/reservations";

const baseData: Reservation = {
	travelId: 0,
	passengerId: 0,
	nbSpots: 0,
	isCancelled: false,
	bookingStatus: "pending",
};

function FormReservation() {
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
			id: "travelId",
			type: "text",
			required: false,
		},
		{
			label: "Passenger",
			id: "passengerId",
			type: "comboboxObject",
			required: false,
			options: usersOptions,
			optionsValues: userIds,
			optionsLabels: usersEmails,
		},
		{
			label: "Reserved Spots",
			id: "nbSpots",
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
			label: "Booking status",
			id: "bookingStatus",
			type: "combobox",
			required: true,
			options: ["pending", "accepted", "refused"],
		},
		{
			label: "Cost",
			id: "cost",
			type: "number",
			required: false,
		},
		{
			label: "Location Travel id",
			id: "locationTravel",
			type: "number",
			required: false,
		},
	];

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
