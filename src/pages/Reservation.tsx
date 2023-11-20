import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useState } from "react";

function Reservation() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "fk_travel", headerName: "id voyage" },
		{ field: "fk_passenger", headerName: "id Passager réservant" },
		{ field: "reservedSpot", headerName: "nombre de place réservé" },
		{ field: "status", headerName: "Etat" },
	];

	const [data, setData] = useState<any[]>([]);

	return (
		<DataGridCustom
			cols={columns}
			title="Réservation"
			subtitle="Table des réservations"
			data={data}
			path="/addreservation"
			setData={setData}
		/>
	);
}

export default Reservation;
