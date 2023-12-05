import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { reservationsApi } from "../api/reservationsApi";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", type: "number", flex: 1, maxWidth: 100 },
	{
		field: "travel_id",
		headerName: "id voyage",
		type: "number",
		flex: 1,
		maxWidth: 100,
	},
	{
		field: "passenger_id",
		headerName: "id Passager réservant",
		type: "number",
		flex: 1,
		maxWidth: 100,
	},
	{
		field: "nb_spots",
		headerName: "nombre de place réservé",
		type: "number",
		flex: 1,
		maxWidth: 100,
	},
	{
		field: "is_paid",
		headerName: "est payé ?",
		type: "boolean",
		flex: 1,
		maxWidth: 100,
	},
	{
		field: "is_cancelled",
		headerName: "est annulé ?",
		type: "boolean",
		flex: 1,
		maxWidth: 100,
	},
	{
		field: "is_confirmed",
		headerName: "est confirmé ?",
		type: "boolean",
		flex: 1,
		maxWidth: 100,
	},
	{
		field: "is_done",
		headerName: "est terminé ?",
		type: "boolean",
		flex: 1,
		maxWidth: 100,
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
