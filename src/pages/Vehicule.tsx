import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useState } from "react";

function Vehicule() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "brand", headerName: "marque" },
		{ field: "model", headerName: "modele" },
		{ field: "color", headerName: "couleur" },
		{ field: "nbPlace", headerName: "nombre de place" },
	];

	const [data, setData] = useState<any[]>([]);

	return (
		<DataGridCustom
			cols={columns}
			title="Véhicules"
			subtitle="Table des véhicules"
			data={data}
			path="/addvehicle"
			setData={setData}
		/>
	);
}

export default Vehicule;
