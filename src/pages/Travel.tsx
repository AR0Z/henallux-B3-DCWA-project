import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useEffect, useState } from "react";
import { travelsApi } from "../api/travelsApi";

function Travel() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "fk_driver", headerName: "id conducteur" },
		{ field: "dateTravel", headerName: "date voyage" },
		{ field: "dateCreate", headerName: "date réservation" },
		{ field: "fk_startingLoc", headerName: "lieu de départ" },
		{ field: "costPerSpot", headerName: "cout par place" },
		{ field: "nbAvailableSpot", headerName: "nombre de place disponible" },
		{ field: "startingTimestamp", headerName: "heure de départ" },
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
		console.log("removed", id);

		travelsApi
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
		travelsApi
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
