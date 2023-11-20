import { GridColDef } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import DataGridCustom from "../components/DataGridCustom";
import { User as UserModel } from "model/User";
import { useEffect, useState } from "react";
import { api } from "../api/api";

const baseData: UserModel[] = [];

function User() {
	const [data, setData] = useState<UserModel[]>(baseData);
	
	useEffect(() => {
		api.get("/users").then((res) => {
			setData(res.data);
		});
	}, [data]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", minWidth: 20, type: "number" },
		{
			field: "firstname",
			headerName: "First name",
			minWidth: 20,
			type: "string",
		},
		{
			field: "lastname",
			headerName: "Last name",
			width: 130,
			type: "string",
			editable: true,
		},
		{
			field: "email",
			headerName: "Email",
			width: 130,
			type: "string",
			editable: true,
		},
		{
			field: "phone",
			headerName: "Phone",
			width: 130,
			type: "string",
			editable: true,
		},
		{
			field: "is_driver",
			headerName: "Is driver",
			width: 130,
			type: "boolean",
			editable: true,
		},
		{
			field: "nb_stars",
			headerName: "Nb stars",
			width: 130,
			type: "number",
			editable: true,
		},
		{
			field: "description",
			headerName: "Description",
			width: 130,
			type: "string",
			editable: true,
		},
		{
			field: "vehicle_id",
			headerName: "Vehicle",
			width: 130,
			type: "string",
			editable: true,
		},
		{
			field: "plateNumber",
			headerName: "Plate number",
			width: 130,
			type: "string",
			editable: true,
		},
	];
	return (
		<>
			<DataGridCustom
				cols={columns}
				data={data}
				title="User"
				subtitle="Liste des utilisateurs"
				path="/adduser"
				setData={setData}
			/>
		</>
	);
}

export default User;
