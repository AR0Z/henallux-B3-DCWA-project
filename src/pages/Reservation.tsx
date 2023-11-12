import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";

function Reservation() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "fk_travel", headerName: "id voyage" },
		{ field: "fk_passenger", headerName: "id Passager réservant" },
		{ field: "reservedSpot", headerName: "nombre de place réservé" },
		{ field: "status", headerName: "Etat" },
	];

	return (
		<DataGridCustom
			cols={columns}
			title="Réservation"
			subtitle="Table des réservations"
			data={null}
		/>
	);
}

export default Reservation;
