import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";
import { travelsApi } from "../../api/travelsApi";
import Header from "../../components/header/Header";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", type: "number", width: 50 },
	{
		field: "driver",
		headerName: "id conducteur",
		editable: true,
		type: "number",
		width: 130,
	},
	{
		field: "startingTimestamp",
		headerName: "date voyage",
		editable: true,
		width: 150,
		type: "dateTime",
		valueFormatter: (params) => {
			return new Date(params.value as number).toLocaleString();
		},
		valueGetter: (params) => {
			return new Date(params.value as number).getTime();
		},
	},
	{
		field: "startLoc",
		headerName: "lieu de départ",
		width: 130,
		editable: true,
		type: "number",
	},
	{
		field: "endLoc",
		headerName: "lieu d'arrivée",
		width: 130,
		editable: true,
		type: "number",
	},
	{
		field: "costPerSpot",
		headerName: "cout par place",
		editable: true,
		width: 130,
		type: "number",
		valueFormatter: (params) => {
			if (params.value === null) return "GRATUIT";
			return `${params.value}€`;
		},
	},
	{
		field: "nbSpots",
		headerName: "nombre de place disponible",
		editable: true,
		width: 130,
		type: "number",
	},
	{
		field: "isCancelled",
		headerName: "est annulé ?",
		editable: true,
		width: 130,
		type: "boolean",
	},
	{
		field: "kmTravel",
		headerName: "kilométrage",
		editable: true,
		width: 130,
		type: "number",
		valueFormatter(params) {
			if (params.value === null) return "pas connu";
			return `${params.value} km`;
		},
	},
	{
		field: "timeTravel",
		headerName: "durée du voyage",
		editable: true,
		width: 130,
		type: "number",
		valueFormatter(params) {
			const value = params.value as number;
			const hours = Math.floor(value / 60);
			const minutes = value % 60;
			return `${hours}h${minutes < 10 ? "0" : ""}${minutes}`;
		},
	},
];
function Travel() {
	document.title = "Voyages";

	return (
		<div className="wrapper">
			<div>
				<Header title={"Travels"} subtitle={"Table des voyages"} />
				<Button variant="contained">
					<Link to={"/addtravel"}>Ajouter un élément</Link>
				</Button>
			</div>
			<DataGridCustom cols={columns} api={travelsApi} />
		</div>
	);
}

export default Travel;
