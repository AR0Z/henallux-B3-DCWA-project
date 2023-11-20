import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useState } from "react";

function Location() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "label", headerName: "Nom" },
		{ field: "lat", headerName: "Latitude" },
		{ field: "lon", headerName: "Longitude" },
		{ field: "nextStop", headerName: "prochain arret" },
	];

	const [data, setData] = useState<any[]>([]);

	return (
		<DataGridCustom
			cols={columns}
			title="Locations"
			subtitle="Table des arrets"
			data={data}
			path="/addlocation"
			setData={setData}
		/>
	);
}

export default Location;
