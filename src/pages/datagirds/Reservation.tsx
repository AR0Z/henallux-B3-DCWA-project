import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/DataGridCustom";
import { reservationsApi } from "../../api/reservationsApi";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", type: "number", width: 50 },
	{
		field: "travel_id",
		headerName: "id voyage",
		type: "number",
		width: 130,
	},
	{
		field: "passenger_id",
		headerName: "id Passager réservant",
		type: "number",
		editable: true,
		width: 130,
	},
	{
		field: "nb_spots",
		headerName: "nombre de place réservé",
		type: "number",
		width: 130,
		editable: true,
	},
	{
		field: "is_paid",
		headerName: "est payé ?",
		type: "boolean",
		editable: true,
		width: 130,
	},
	{
		field: "is_cancelled",
		headerName: "est annulé ?",
		type: "boolean",
		editable: true,
		width: 130,
	},
	{
		field: "is_confirmed",
		headerName: "est confirmé ?",
		type: "boolean",
		width: 130,
		editable: true,
	},
	{
		field: "is_done",
		headerName: "est terminé ?",
		type: "boolean",
		width: 130,
		editable: true,
	},
];

function Reservation() {
	return (
		<DataGridCustom
			cols={columns}
			title="Réservation"
			subtitle="Table des réservations"
			path="/addreservation"
			api={reservationsApi}
		/>
	);
}

export default Reservation;
