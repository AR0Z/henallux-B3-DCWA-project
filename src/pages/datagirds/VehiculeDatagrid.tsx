import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";
import { vehiculesApi } from "../../api/vehiclesApi";
import { brands } from "../../assets/vehiculesData";
import Header from "../../components/header/Header";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 50, type: "number" },
	{
		field: "brand",
		headerName: "marque",
		editable: true,
		width: 130,
		type: "singleSelect",
		valueOptions: brands,
	},
	{
		field: "model",
		headerName: "modele",
		editable: true,
		width: 130,
		type: "string",
	},
	{
		field: "color",
		headerName: "couleur",
		editable: true,
		width: 130,
		type: "string",
	},
	{
		field: "nbSeats",
		headerName: "nombre de place",
		editable: true,
		width: 130,
		type: "number",
	},
];
function Vehicule() {
	document.title = "Vehicules";

	return (
		<div className="wrapper">
			<div>
				<Header title={"Véhicules"} subtitle={"Table des véhicules"} />
				<Button variant="contained">
					<Link to={"/addvehicle"}>Ajouter un élément</Link>
				</Button>
			</div>
			<DataGridCustom cols={columns} api={vehiculesApi} />
		</div>
	);
}

export default Vehicule;
