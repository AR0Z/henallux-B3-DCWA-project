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
		width: 70,
	},
	{
		field: "locationTravel",
		headerName: "id lieu départ",
		type: "number",
		width: 90,
	},
	{
		field: "starConductor",
		headerName: "note conducteur",
		type: "number",
		width: 110,
		valueFormatter(params) {
			return params.value ? params.value : "Pas de note";
		},
	},
	{
		field: "starPassenger",
		headerName: "Note passager",
		type: "number",
		width: 120,
		valueFormatter(params) {
			return params.value ? params.value : "Pas de note";
		},
	},
	{
		field: "passengerId",
		headerName: "id passager",
		type: "number",
		editable: true,
		width: 90,
	},
	{
		field: "cost",
		headerName: "coût",
		type: "number",
		editable: true,
		width: 90,
		valueFormatter(params) {
			return params.value ? params.value : "GRATUIT";
		},
	},
	{
		field: "nbSpots",
		headerName: "place réservé",
		type: "number",
		width: 110,
		editable: true,
	},
	{
		field: "isPaid",
		headerName: "est payé ?",
		type: "boolean",
		editable: true,
		width: 90,
	},
	{
		field: "isCancelled",
		headerName: "est annulé ?",
		type: "boolean",
		editable: true,
		width: 90,
	},
	{
		field: "bookingStatus",
		headerName: "état",
		type: "singleSelect",
		valueOptions: ["accepted", "pending", "refused"],
		width: 75,
	},
];

function Reservation() {
	document.title = "Réservations";
	return (
		<div className="wrapper">
			<div>
				<Header title={"Bookings"} subtitle={"Table des réservations"} />
				<Button variant="contained">
					<Link to={"/addreservation"}>Ajouter un élément</Link>
				</Button>
			</div>
			<DataGridCustom cols={columns} api={reservationsApi} />
		</div>
	);
}

export default Reservation;
