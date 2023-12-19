import { Box, Theme, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import InfoCard from "../components/InfoCard";
import "./dashboard.css";

const cols: GridColDef[] = [
	{ sortable: false, field: "id", headerName: "ID" },
	{
		sortable: false,
		field: "firstName",
		headerName: "First name",
		width: 130,
	},
	{ sortable: false, field: "lastName", headerName: "Last name", width: 130 },
	{ sortable: false, field: "email", headerName: "Email", width: 130 },
	{ sortable: false, field: "nbStars", headerName: "Nb stars", width: 130 },
	{
		sortable: false,
		field: "numberOfKm",
		headerName: "Number of km",
		width: 130,
	},
];

function Dashboard() {
	const theme: Theme = useTheme();

	const data = {
		nbKm: 2000,
		nbCovoit: 1000,
		nbCovoitCanceled: 2,
	};

	const datagridTheme = {
		"& .MuiDataGrid-root": {
			border: "none",
		},
		"& .MuiDataGrid-columnHeaders": {
			borderBottom: "none",
		},
		"& .MuiDataGrid-virtualScroller": {
			backgroundColor: theme.palette.primary.light,
		},
		"& .MuiDataGrid-footerContainer": {
			backgroundColor: theme.palette.background.default,
			color: theme.palette.secondary.main,
			borderTop: "none",
		},
	};

	return (
		<div className="wrapper-dashboard">
			<Header
				title="Dashboard"
				subtitle="Bienvenue sur le dashboard du back office"
			/>

			<FlexBetween gap="10px">
				<div className="wrapper-info-card">
					<InfoCard
						icon={"valid"}
						data={data.nbKm}
						label="Kilomètres éffectués"
					/>
					<InfoCard
						icon={"rising"}
						data={data.nbCovoit}
						label="Covoiturages effectués"
					/>
					<InfoCard
						icon={"decreasing"}
						data={data.nbCovoitCanceled}
						label="Covoiturages annulés"
					/>
				</div>
				<Box className="wrapper-datagrid" sx={datagridTheme}>
					<DataGrid
						loading={false}
						rows={[]}
						columns={cols}
						hideFooter
						autoHeight
						initialState={{
							sorting: {
								sortModel: [{ field: "numberOfKm", sort: "desc" }],
							},
						}}	
					/>
				</Box>
			</FlexBetween>
		</div>
	);
}

export default Dashboard;
