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
		vehiclesApi.update(id, data).then(() => {
			fillState();
		});
	}

	function removeData(id: string) {
		vehiclesApi.delete(id).then(() => {
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
