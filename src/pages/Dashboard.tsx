import { Box } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import React from "react";
import Header from "../components/Header";
import { PieChart } from "@mui/x-charts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { User as UserModel } from "model/User";
import {
	randomBoolean,
	randomEmail,
	randomId,
	randomInt,
	randomPhoneNumber,
	randomUserName,
} from "@mui/x-data-grid-generator";
import { useTheme } from "@emotion/react";
import { BorderAllRounded } from "@mui/icons-material";

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

const piecharData = [
	{
		id: 0,
		value: 8,
		label: "% routes en cours",
		color: "orange",
	},
	{
		id: 1,
		value: 90,
		label: "% routes validé",
		color: "green",
	},
	{
		id: 2,
		value: 2,
		label: "% routes annulés",
		color: "red",
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
				<Box width="50%" mt="40px">
					<PieChart
						loading={!data}
						series={[
							{
								data: piecharData,
								arcLabel: (item) => item.value + "%",
								startAngle: -90,
							},
						]}
						slotProps={{
							legend: {
								position: { vertical: "top", horizontal: "middle" },
								direction: "column",
								padding: 0,
							},
						}}
						margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
						height={600}
					/>
				</Box>
				<Box
					mt="40px"
					height="72vh"
					sx={{
						"& .MuiDataGrid-root": {
							border: "none",
						},
						"& .MuiDataGrid-columnHeaders": {
							backgroundColor: theme.palette.background.default,
							color: theme.palette.secondary[100],
							borderBottom: "none",
						},
						"& .MuiDataGrid-virtualScroller": {
							backgroundColor: theme.palette.primary.light,
						},
						"& .MuiDataGrid-footerContainer": {
							backgroundColor: theme.palette.background.default,
							// @ts-ignore
							color: theme.palette.secondary[100],
							borderTop: "none",
						},
					}}
					p={"20px"}>
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
