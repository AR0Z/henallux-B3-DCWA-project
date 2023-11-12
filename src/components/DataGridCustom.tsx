import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import Header from "../components/Header";

function DataGridCustom({
	title,
	subtitle,
	data,
	cols,
}: {
	title: string;
	subtitle: string;
	data: any;
	cols: GridColDef[];
}) {
	const theme = useTheme();

	return (
		<>
			<Box m="1.5rem 2.5rem">
				<Header title={title} subtitle={subtitle} />
				<Box
					mt="40px"
					height="75vh"
					sx={{
						"& .MuiDataGrid-root": {
							border: "none",
						},
						"& .MuiDataGrid-columnHeaders": {
							backgroundColor: theme.palette.background.default,
							// @ts-ignore
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
					}}>
					<DataGrid
						loading={!data}
						rows={data || []}
						columns={cols}
						hideFooter
						slotProps={{
							toolbar: {
								showQuickFilter: true,
							},
						}}
						slots={{ toolbar: GridToolbarQuickFilter }}
					/>
				</Box>
			</Box>
		</>
	);
}

export default DataGridCustom;
