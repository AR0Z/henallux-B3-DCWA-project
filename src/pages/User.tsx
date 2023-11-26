import { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import DataGridCustom from "../components/DataGridCustom";
import { User as UserModel } from "model/User";
import { useEffect, useState } from "react";
import { api } from "../api/api";

function User() {
	const [data, setData] = useState<UserModel[]>([]);

	function fillState() {
		api.get("/users").then((res) => {
			setData(res.data);
		});
	}

	useEffect(() => {
		fillState();
	}, []);

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
			preProcessEditCellProps(params: GridPreProcessEditCellProps) {
				const regexp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
				const hasError = !regexp.test(params.props.value as string);
				return { ...params.props, error: hasError };
			},
		},
		{
			field: "phone",
			headerName: "Phone",
			width: 130,
			type: "string",
			editable: true,
			preProcessEditCellProps(params: GridPreProcessEditCellProps) {
				const regexp = new RegExp(
					"^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
				);
				const hasError = !regexp.test(params.props.value as string);
				return { ...params.props, error: hasError };
			},
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

	function updateData(newData: UserModel) {
		console.log("edited", newData);

		api.put("/users/" + newData.id, newData).then((res) => {
			console.log(res);
		});
	}

	function removeData(id: number) {
		console.log("removed", id);

		api.delete("/users/" + id).then((res) => {
			console.log(res);
		});
		fillState();
	}

	return (
		<>
			<DataGridCustom
				cols={columns}
				data={data || []}
				updateData={updateData}
				removeData={removeData}
				title="User"
				subtitle="Liste des utilisateurs"
				path="/adduser"
			/>
		</>
	);
}

export default User;
