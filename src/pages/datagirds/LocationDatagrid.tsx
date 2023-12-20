import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/DataGridCustom";
import { locationsApi } from "../../api/locationsApi";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 50, type: "number" },
	{ field: "label", headerName: "Nom", editable: true, width: 130 },
	{ field: "latitude", headerName: "Latitude", editable: true, width: 130 },
	{ field: "longitude", headerName: "Longitude", editable: true, width: 130 },
	{
		field: "next_stop",
		headerName: "prochain arret",
		editable: true,
		width: 130,
	},
];

function Location() {
	return (
		<div className="wrapper">
			<div>
				<Header title={"Locations"} subtitle={"Table des arrets"} />
				<Button variant="contained">
					<Link to={"/addlocation"}>Ajouter un élément</Link>
				</Button>
			</div>
			<DataGridCustom cols={columns} api={locationsApi} />
		</div>
	);
}

export default Location;
