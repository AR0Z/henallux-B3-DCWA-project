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
	GridToolbar,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { GridRowId } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Cancel, Delete, EditOutlined, Save } from "@mui/icons-material";
import { AxiosResponse } from "axios";

type Props = {
	title: string;
	subtitle: string;
	cols: GridColDef[];
	path: string;
	api: any;
};

function DataGridCustom({ title, subtitle, cols, path, api }: Props) {
	const theme = useTheme();
	const [rows, setRows] = useState<any[]>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

	useEffect(() => {
		updateData();
	}, []);

	function updateData() {
		api.getAll().then((res: AxiosResponse) => {
			setRows(res.data);
		});
	}

	function putData(newData: any) {
		api.update(newData.id, newData).then(() => {
			updateData();
		});
	}

	function removeData(id: string) {
		api.delete(id).then(() => {
			updateData();
		});
	}

	useEffect(() => {
		updateData();
	}, []);

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
		if (!window.confirm("Are you sure you want to delete this item?")) return;
		const itemToDelete = rows.find((row: any) => row.id === id);
		removeData(itemToDelete.id);

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
		putData(updatedRow);
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: any = [
		...cols,
		{
			flex: 0,
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
						density="comfortable"
						rows={rows || []}
						columns={columns}
						editMode="row"
						rowModesModel={rowModesModel}
						onRowModesModelChange={handleRowModesModelChange}
						onRowEditStop={handleRowEditStop}
						processRowUpdate={processRowUpdate}
						slotProps={{
							toolbar: { setRows, setRowModesModel, showQuickFilter: true },
						}}
						slots={{ toolbar: GridToolbar }}
					/>
				</Box>
			</Box>
		</>
	);
}

export default DataGridCustom;
