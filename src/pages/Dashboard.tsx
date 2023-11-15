import { Box } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
	randomBoolean,
	randomEmail,
	randomId,
	randomInt,
	randomPhoneNumber,
	randomUserName,
} from "@mui/x-data-grid-generator";
import { useTheme } from "@emotion/react";
import InfoCard from "../components/InfoCard";

let data: any[] = [];
for (let i = 0; i < 10; i++) {
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
		numberOfKm: randomInt(0, 1000),
	});
}

const cols: GridColDef[] = [
	{ sortable: false, field: "id", headerName: "ID" },
	{ sortable: false, field: "firstName", headerName: "First name", width: 130 },
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
	const theme = useTheme();

	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="Dashboard"
				subtitle="Bienvenue sur le dashboard du back office"
			/>

			<FlexBetween gap="10px">
				<div
					style={{
						display: "flex",
						alignItems: "start",
						height: "72vh",
						width: "100%",
						justifyContent: "space-between",
						paddingTop: "100px",
					}}>
					<InfoCard icon={"valid"} data={2000} label="Kilomètres éffectués" />
					<InfoCard
						icon={"rising"}
						data={1000}
						label="Covoiturages effectués"
					/>
					<InfoCard icon={"decreasing"} data={2} label="Covoiturages annulés" />
				</div>
				<Box
					mt="40px"
					height="72vh"
					sx={{
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
							// @ts-ignore
							backgroundColor: theme.palette.background.default,
							// @ts-ignore
							color: theme.palette.secondary[100],
							borderTop: "none",
						},
					}}
					p={"20px"}
					width={"100%"}>
					<DataGrid
						loading={false}
						rows={data || []}
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
		</Box>
	);
}

export default Dashboard;
