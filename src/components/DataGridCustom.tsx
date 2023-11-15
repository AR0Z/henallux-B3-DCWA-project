import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function DataGridCustom(props: {
	title: string;
	subtitle: string;
	data: any;
	cols: GridColDef[];
	path: string;
}) {
	const theme = useTheme();
	const { title, subtitle, data, cols, path } = props;
	return (
		<>
			<Box m="1.5rem 2.5rem">
				<Box>
					<Header title={title} subtitle={subtitle} />
					<Button variant="contained">
						<Link to={path}>Ajouter un élément</Link>
					</Button>
				</Box>
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
