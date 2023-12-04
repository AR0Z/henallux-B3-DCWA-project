import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { locationsApi } from "../api/locationsApi";

function Location() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "label", headerName: "Nom", editable: true },
		{ field: "latitude", headerName: "Latitude", editable: true },
		{ field: "longitude", headerName: "Longitude", editable: true },
		{ field: "next_stop", headerName: "prochain arret", editable: true },
	];

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
