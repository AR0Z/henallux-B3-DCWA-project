import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useEffect, useState } from "react";
import { reservationsApi } from "../api/reservationsApi";

function Reservation() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", type: "number", flex: 1, maxWidth: 100 },
		{
			field: "travel_id",
			headerName: "id voyage",
			type: "number",
			flex: 1,
			maxWidth: 100,
		},
		{
			field: "passenger_id",
			headerName: "id Passager réservant",
			type: "number",
			flex: 1,
			maxWidth: 100,
		},
		{
			field: "nb_spots",
			headerName: "nombre de place réservé",
			type: "number",
			flex: 1,
			maxWidth: 100,
		},
		{
			field: "is_paid",
			headerName: "est payé ?",
			type: "boolean",
			flex: 1,
			maxWidth: 100,
		},
		{
			field: "is_cancelled",
			headerName: "est annulé ?",
			type: "boolean",
			flex: 1,
			maxWidth: 100,
		},
		{
			field: "is_confirmed",
			headerName: "est confirmé ?",
			type: "boolean",
			flex: 1,
			maxWidth: 100,
		},
		{
			field: "is_done",
			headerName: "est terminé ?",
			type: "boolean",
			flex: 1,
			maxWidth: 100,
		},
	];

	const [data, setData] = useState<any[]>([]);

	function fillState() {
		reservationsApi.getAll().then((res) => {
			setData(res.data);
		});
	}
	useEffect(() => {
		fillState();
	}, []);
	function removeData(id: string) {
		console.log("removed", id);

		reservationsApi
			.delete(id)
			.then((res) => {
				console.log(res);
			})
			.then(() => {
				fillState();
			});
	}

	function updateData(id: string, data: any) {
		console.log("updated", id, data);
		reservationsApi
			.update(id, data)
			.then((res) => {
				console.log(res);
			})
			.then(() => {
				fillState();
			});
	}

	return (
		<DataGridCustom
			cols={columns}
			title="Réservation"
			subtitle="Table des réservations"
			data={data}
			path="/addreservation"
			updateData={updateData}
			removeData={removeData}
		/>
	);
}

export default Reservation;
