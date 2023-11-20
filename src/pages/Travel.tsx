import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useState } from "react";
function Travel() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "fk_driver", headerName: "id conducteur" },
		{ field: "dateTravel", headerName: "date voyage" },
		{ field: "dateCreate", headerName: "date réservation" },
		{ field: "fk_startingLoc", headerName: "lieu de départ" },
		{ field: "costPerSpot", headerName: "cout par place" },
		{ field: "nbAvailableSpot", headerName: "nombre de place disponible" },
		{ field: "startingTimestamp", headerName: "heure de départ" },
	];

	const [data, setData] = useState<any[]>([]);


	return (
		<DataGridCustom
			cols={columns}
			title="Travel"
			subtitle="Table des voyages"
			data={data}
			path="/addtravel"
			setData={setData}
		/>
	);
}

export default Travel;
