import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/DataGridCustom";
import { travelsApi } from "../../api/travelsApi";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", type: "number", width: 50 },
	{
		field: "fk_driver",
		headerName: "id conducteur",
		editable: true,
		type: "number",
		width: 130,
	},
	{
		field: "dateTravel",
		headerName: "date voyage",
		editable: true,
		width: 130,
		type: "date",
	},
	{
		field: "dateCreate",
		headerName: "date réservation",
		editable: true,
		width: 130,
		type: "date",
	},
	{
		field: "fk_startingLoc",
		headerName: "lieu de départ",
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
	},
	{
		field: "nbAvailableSpot",
		headerName: "nombre de place disponible",
		editable: true,
		width: 130,
		type: "number",
	},
	{
		field: "startingTimestamp",
		headerName: "heure de départ",
		editable: true,
		width: 130,
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
