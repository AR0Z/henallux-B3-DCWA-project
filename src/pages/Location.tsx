import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useEffect, useState } from "react";
import { locationsApi } from "../api/locationsApi";

function Location() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "label", headerName: "Nom", editable: true },
		{ field: "latitude", headerName: "Latitude", editable: true },
		{ field: "longitude", headerName: "Longitude", editable: true },
		{ field: "next_stop", headerName: "prochain arret", editable: true },
	];

	const [data, setData] = useState<any[]>([]);

	function fillState() {
		locationsApi.getAll().then((res) => {
			setData(res.data);
		});
	}

	useEffect(() => {
		fillState();
	}, []);

	function removeData(id: string) {
		locationsApi.delete(id).then(() => {
			fillState();
		});
	}

	function updateData(data: any) {
		locationsApi.update(data.id, data).then(() => {
			fillState();
		});
	}

	return (
		<DataGridCustom
			cols={columns}
			title="Locations"
			subtitle="Table des arrets"
			data={data}
			path="/addlocation"
			updateData={updateData}
			removeData={removeData}
		/>
	);
}

export default Location;
