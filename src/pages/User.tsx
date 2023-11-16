import { GridColDef } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import DataGridCustom from "../components/DataGridCustom";
import { User as UserModel } from "model/User";
import {
	randomId,
	randomUserName,
	randomEmail,
	randomPhoneNumber,
	randomBoolean,
	randomInt,
} from "@mui/x-data-grid-generator";

let data: UserModel[] = [];
for (let i = 0; i < 100; i++) {
	data.push({
		id: randomId(),
		firstName: randomUserName(),
		lastName: randomUserName(),
		email: randomEmail(),
		isDriver: randomBoolean(),
		nbStars: randomInt(0, 5),
		password: randomUserName(),
		phoneNumber: randomPhoneNumber(),
		description: "description",
		vehicle: "vehicle",
		plateNumber: undefined,
	});
}

function User() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{
			field: "firstName",
			headerName: "First name",
			width: 130,
			type: "string",
		},
		{ field: "lastName", headerName: "Last name", width: 130, type: "string" },
		{ field: "email", headerName: "Email", width: 130, type: "string" },
		{ field: "phoneNumber", headerName: "Phone", width: 130, type: "string" },
		{
			field: "isDriver",
			headerName: "Is driver",
			width: 13,
			type: "boolean",
			editable: true,
		},
		{ field: "nbStars", headerName: "Nb stars", width: 130, type: "number" },
		{
			field: "description",
			headerName: "Description",
			width: 130,
			type: "string",
		},
		{ field: "vehicle", headerName: "Vehicle", width: 130, type: "string" },
		{
			field: "plateNumber",
			headerName: "Plate number",
			width: 130,
			type: "string",
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
			/>
		</>
	);
}

export default User;
