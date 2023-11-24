import { Box, Button, useTheme } from "@mui/material";
import {
	DataGrid,
	GridActionsCellItem,
	GridColDef,
	GridEventListener,
	GridRowEditStopReasons,
	GridRowModel,
	GridRowModes,
	GridRowModesModel,
	GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { GridRowId } from "@mui/x-data-grid";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { Cancel, Delete, EditOutlined, Save } from "@mui/icons-material";

type Props = {
	title: string;
	subtitle: string;
	data: any;
	updateData: Function;
	cols: GridColDef[];
	path: string;
};

function DataGridCustom({
	title,
	subtitle,
	cols,
	path,
	data,
	updateData,
}: Props) {
	const theme = useTheme();
	const [rows, setRows] = useState<any[]>(data);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

	useEffect(() => {
		setRows(data);
	}, [data]);

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (
		params,
		event
	) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		setRows(rows.filter((row: any) => row.id !== id));
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
		const editedRow = rows.find((row: any) => row.id === id);
		if (editedRow!.isNew) {
			setRows(rows.filter((row: any) => row.id !== id));
		}
	};

	const processRowUpdate = (newRow: GridRowModel) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		updateData(updatedRow);
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: any = [
		...cols,
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 100,
			cellClassName: "actions",
			getActions: ({ id }: any) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<Save sx={{ color: theme.palette.grey[100] }} />}
							label="Save"
							sx={{
								color: "primary.main",
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<Cancel />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditOutlined />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<Delete />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

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
						"& .Mui-error": {
							backgroundColor: `rgb(126,10,15, ${
								theme.palette.mode === "dark" ? 0 : 0.1
							})`,
							color: theme.palette.mode === "dark" ? "#ff4343" : "#750f0f",
						},
					}}>
					<DataGrid
						loading={!rows}
						rows={rows || []}
						columns={columns}
						editMode="row"
						rowModesModel={rowModesModel}
						onRowModesModelChange={handleRowModesModelChange}
						onRowEditStop={handleRowEditStop}
						processRowUpdate={processRowUpdate}
						slotProps={{
							toolbar: { setRows, setRowModesModel },
						}}
					/>
				</Box>
			</Box>
		</>
	);
}

export default DataGridCustom;
