import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import Header from "../components/Header";
import DataGridCustom from "../components/DataGridCustom";

const data = [
	{
		id: 1,
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		phone: "0123456789",
	},
	{
		id: 2,
		firstName: "Jane",
		lastName: "Doe",
		email: "JaneDoe@example.com",
		phone: "0123456789",
	},
];

function User() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "firstName", headerName: "First name", width: 130 },
		{ field: "lastName", headerName: "Last name", width: 130 },
		{ field: "email", headerName: "Email", width: 130 },
		{ field: "phone", headerName: "Phone", width: 130 },
	];

	return (
		<>
			<DataGridCustom
				cols={columns}
				data={data}
				title="User"
				subtitle="Liste des utilisateurs"
			/>
		</>
	);
}

export default User;
