import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/DataGridCustom";
import { locationsApi } from "../../api/locationsApi";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 50, type: "number" },
	{ field: "label", headerName: "Nom", editable: true, width: 130 },
	{ field: "latitude", headerName: "Latitude", editable: true, width: 130 },
	{ field: "longitude", headerName: "Longitude", editable: true, width: 130 },
	{
		field: "next_stop",
		headerName: "prochain arret",
		editable: true,
		width: 130,
	},
];

function Location() {
	return (
		<DataGridCustom
			cols={columns}
			title="Locations"
			subtitle="Table des arrets"
			path="/addlocation"
			api={locationsApi}
		/>
	);
}

export default Location;
