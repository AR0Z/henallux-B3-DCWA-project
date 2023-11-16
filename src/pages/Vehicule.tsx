import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";

function Vehicule() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "brand", headerName: "marque" },
		{ field: "model", headerName: "modele" },
		{ field: "color", headerName: "couleur" },
		{ field: "nbPlace", headerName: "nombre de place" },
	];

	return (
		<DataGridCustom
			cols={columns}
			title="Véhicules"
			subtitle="Table des véhicules"
			data={null}
			path="/addvehicle"
		/>
	);
}

export default Vehicule;
