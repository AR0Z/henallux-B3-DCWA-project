import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useEffect, useState } from "react";
import { vehiclesApi } from "../api/vehiclesApi";

function Vehicule() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "brand", headerName: "marque" },
		{ field: "model", headerName: "modele" },
		{ field: "color", headerName: "couleur" },
		{ field: "nbPlace", headerName: "nombre de place" },
	];

	const [data, setData] = useState<any[]>([]);

	function fillState() {
		vehiclesApi.getAll().then((res) => {
			setData(res.data);
		});
	}

	useEffect(() => {
		fillState();
	}, []);

	function updateData(id: string, data: any) {
		console.log("updated", id, data);
		vehiclesApi
			.update(id, data)
			.then((res) => {
				console.log(res);
			})
			.then(() => {
				fillState();
			});
	}

	function removeData(id: string) {
		console.log("removed", id);

		vehiclesApi
			.delete(id)
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
			title="Véhicules"
			subtitle="Table des véhicules"
			data={data}
			path="/addvehicle"
			updateData={updateData}
			removeData={removeData}
		/>
	);
}

export default Vehicule;
