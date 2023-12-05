import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { travelsApi } from "../api/travelsApi";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", type: "number" },
	{
		field: "fk_driver",
		headerName: "id conducteur",
		editable: true,
		type: "number",
	},
	{
		field: "dateTravel",
		headerName: "date voyage",
		editable: true,
		type: "date",
	},
	{
		field: "dateCreate",
		headerName: "date réservation",
		editable: true,
		type: "date",
	},
	{
		field: "fk_startingLoc",
		headerName: "lieu de départ",
		editable: true,
		type: "number",
	},
	{
		field: "costPerSpot",
		headerName: "cout par place",
		editable: true,
		type: "number",
	},
	{
		field: "nbAvailableSpot",
		headerName: "nombre de place disponible",
		editable: true,
		type: "number",
	},
	{
		field: "startingTimestamp",
		headerName: "heure de départ",
		editable: true,
		type: "dateTime",
	},
];
function Travel() {
	return (
		<DataGridCustom
			cols={columns}
			title="Travel"
			subtitle="Table des voyages"
			path="/addtravel"
			api={travelsApi}
		/>
	);
}

export default Travel;
