import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";

function Location() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "label", headerName: "Nom" },
		{ field: "lat", headerName: "Latitude" },
		{ field: "lon", headerName: "Longitude" },
		{ field: "nextStop", headerName: "prochain arret" },
	];

	return (
		<DataGridCustom
			cols={columns}
			title="Locations"
			subtitle="Table des arrets"
			data={null}
			path="/addlocation"
		/>
	);
}

export default Location;
