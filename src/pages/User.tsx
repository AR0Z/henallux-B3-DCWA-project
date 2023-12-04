import { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import DataGridCustom from "../components/DataGridCustom";
import { User as UserModel } from "model/User";
import { useEffect, useState } from "react";
import { usersApi } from "../api/usersApi";
import { phoneFormat, emailFormat } from "../components/utils";

function User() {
	const [data, setData] = useState<UserModel[]>([]);

	function fillState() {
		usersApi.getAll().then((res) => {
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
				return { ...params.props, error: !emailFormat(params.props.value) };
			},
		},
		{
			field: "phone",
			headerName: "Phone",
			width: 130,
			type: "string",
			editable: true,
			preProcessEditCellProps(params: GridPreProcessEditCellProps) {
				return { ...params.props, error: !phoneFormat(params.props.value) };
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
			field: "is_admin",
			headerName: "Is admin",
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
		usersApi.delete(id).then(() => {
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
