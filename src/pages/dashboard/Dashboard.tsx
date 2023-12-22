import { Box, Theme, useTheme } from "@mui/material";
import Header from "../../components/header/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import InfoCard from "../../components/infoCard/InfoCard";
import "./dashboard.css";
import { useEffect, useState } from "react";
import {
	getTotalKM,
	getTotalCarshareDone,
	getTotalCanceled,
	getTop10,
} from "../../api/api";

const cols: GridColDef[] = [
	{ sortable: false, field: "id", headerName: "ID", width: 30 },
	{
		sortable: false,
		field: "firstname",
		headerName: "First name",
		width: 75,
	},
	{ sortable: false, field: "lastname", headerName: "Last name", width: 75 },
	{ sortable: false, field: "email", headerName: "Email", width: 150 },
	{
		sortable: false,
		field: "stars",
		headerName: "Nombre d'étoile",
		width: 120,
		valueFormatter: (params) => {
			if (params.value.starCount) return "Pas de note";
			let result = "";
			for (let i = 0; i < params.value.starCount; i++) {
				result += "⭐";
			}
			return result;
		},
	},
	{
		sortable: false,
		field: "totalKm",
		headerName: "Km effectués",
		width: 130,
		valueFormatter: (params) => {
			return params.value + " km";
		},
	},
];

function Dashboard() {
	document.title = "Dashboard";
	const theme: Theme = useTheme();

	const [data, setData] = useState({
		nbKm: 0,
		nbCovoit: 0,
		nbCovoitCanceled: 0,
	});

	const [top10, setTop10] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const resultTotalKm = await getTotalKM();
			if (resultTotalKm.total === null) {
				setData((prev) => ({ ...prev, nbKm: 0 }));
			} else {
				setData((prev) => ({ ...prev, nbKm: resultTotalKm.total }));
			}
			const resultTotalCarshareDone = await getTotalCarshareDone();
			if (resultTotalCarshareDone.total !== undefined) {
				setData((prev) => ({
					...prev,
					nbCovoit: resultTotalCarshareDone.total,
				}));
			}

			const resultTotalCanceled = await getTotalCanceled();
			if (resultTotalCanceled.total !== undefined) {
				setData((prev) => ({
					...prev,
					nbCovoitCanceled: resultTotalCanceled.total,
				}));
			}

			const resultTop10 = await getTop10();
			if (resultTop10) {
				setTop10(resultTop10);
			}
		};

		fetchData();
	}, []);

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

			<div
				style={{
					display: "flex",
				}}>
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
						rows={top10}
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
			</div>
		</div>
	);
}

export default Dashboard;
