import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/DataGridCustom";
import { vehiculesApi } from "../../api/vehiclesApi";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID" },
	{ field: "brand", headerName: "marque" },
	{ field: "model", headerName: "modele" },
	{ field: "color", headerName: "couleur" },
	{ field: "nbPlace", headerName: "nombre de place" },
];
function Vehicule() {
	return (
		<DataGridCustom
			cols={columns}
			title="Véhicules"
			subtitle="Table des véhicules"
			path="/addvehicle"
			api={vehiculesApi}
		/>
	);
}

export default Vehicule;
