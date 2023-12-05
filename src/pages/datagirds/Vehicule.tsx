import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/DataGridCustom";
import { vehiculesApi } from "../../api/vehiclesApi";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 50, type: "number" },
	{ field: "brand", headerName: "marque", editable: true, width: 130 },
	{ field: "model", headerName: "modele", editable: true, width: 130 },
	{ field: "color", headerName: "couleur", editable: true, width: 130 },
	{
		field: "nb_seats",
		headerName: "nombre de place",
		editable: true,
		width: 130,
	},
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
