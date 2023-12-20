import { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import DataGridCustom from "../../components/DataGridCustom";
import { usersApi } from "../../api/usersApi";
import { phoneFormat, emailFormat } from "../../components/utils";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
	{
		field: "id",
		headerName: "ID",
		width: 50,
		type: "number",
	},
	{
		field: "firstname",
		headerName: "First name",
		width: 130,
		type: "string",
		editable: true,
		preProcessEditCellProps(params: GridPreProcessEditCellProps) {
			return { ...params.props, error: params.props.value.length < 3 };
		},
	},
	{
		field: "lastname",
		headerName: "Last name",
		width: 130,
		type: "string",
		editable: true,
		preProcessEditCellProps(params: GridPreProcessEditCellProps) {
			return { ...params.props, error: params.props.value.length < 3 };
		},
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
		field: "isDriver",
		headerName: "Is driver",
		width: 130,
		type: "boolean",
		editable: true,
	},
	{
		field: "isAdmin",
		headerName: "Is admin",
		width: 130,
		type: "boolean",
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
		field: "vehicleId",
		headerName: "Vehicle",
		width: 130,
		type: "string",
		editable: true,
	},
];
function User() {
	return (
		<div className="wrapper">
			<div>
				<Header title={"User"} subtitle={"Liste des utilisateurs"} />
				<Button variant="contained">
					<Link to={"/adduser"}>Ajouter un élément</Link>
				</Button>
			</div>
			<DataGridCustom cols={columns} api={usersApi} />
		</div>
	);
}

export default User;
