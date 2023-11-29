import { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import DataGridCustom from "../components/DataGridCustom";
import { User as UserModel } from "model/User";
import { useEffect, useState } from "react";
import { usersApi } from "../api/usersApi";

function User() {
	const [data, setData] = useState<UserModel[]>([]);

	function fillState() {
		usersApi.getAll().then((res) => {
			setData(res.data);
			console.log(res.data);
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
			flex: 1,
			maxWidth: 300,
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
		usersApi.update(newData.id, newData);
	}

	function removeData(id: string) {
		usersApi
			.delete(id)
			.then((res) => {
				console.log(res);
			})
			.then(() => {
				fillState();
			});
	}

	return (
		<>
			<DataGridCustom
				cols={columns}
				data={data}
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
