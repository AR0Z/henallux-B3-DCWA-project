import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useEffect, useState } from "react";
import { travelsApi } from "../api/travelsApi";

function Travel() {
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

	const [data, setData] = useState<any[]>([]);

	function fillState() {
		travelsApi.getAll().then((res) => {
			setData(res.data);
		});
	}

	useEffect(() => {
		fillState();
	}, []);

	function removeData(id: string) {
		travelsApi.delete(id).then(() => {
			fillState();
		});
	}

	function updateData(id: string, data: any) {
		travelsApi.update(id, data).then(() => {
			fillState();
		});
	}

	return (
		<DataGridCustom
			cols={columns}
			title="Travel"
			subtitle="Table des voyages"
			data={data}
			path="/addtravel"
			removeData={removeData}
			updateData={updateData}
		/>
	);
}

export default Travel;
