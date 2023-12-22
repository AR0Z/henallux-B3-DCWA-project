import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/dataGridCustom/DataGridCustom";
import { reservationsApi } from "../../api/reservationsApi";
import Header from "../../components/header/Header";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", type: "number", width: 50 },
	{
		field: "travelId",
		headerName: "id voyage",
		type: "number",
		width: 130,
	},
	{
		field: "passengerId",
		headerName: "id Passager réservant",
		type: "number",
		editable: true,
		width: 130,
	},
	{
		field: "nbSpots",
		headerName: "nombre de place réservé",
		type: "number",
		width: 130,
		editable: true,
	},
	{
		field: "isPaid",
		headerName: "est payé ?",
		type: "boolean",
		editable: true,
		width: 130,
	},
	{
		field: "isCancelled",
		headerName: "est annulé ?",
		type: "boolean",
		editable: true,
		width: 130,
	},
	{
		field: "isConfirmed",
		headerName: "est confirmé ?",
		type: "boolean",
		width: 130,
		editable: true,
	},
	{
		field: "isDone",
		headerName: "est terminé ?",
		type: "boolean",
		width: 130,
		editable: true,
	},
];

function Reservation() {
	document.title = "Réservations";
	return (
		<div className="wrapper">
			<div>
				<Header title={"Réservation"} subtitle={"Table des réservations"} />
				<Button variant="contained">
					<Link to={"/addreservation"}>Ajouter un élément</Link>
				</Button>
			</div>
			<DataGridCustom cols={columns} api={reservationsApi} />
		</div>
	);
}

export default Reservation;
