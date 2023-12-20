import {
	Alert,
	AlertColor,
	Box,
	Snackbar,
	Stack,
	useTheme,
} from "@mui/material";
import {
	DataGrid,
	GridActionsCellItem,
	GridColDef,
	GridEventListener,
	GridRowEditStopReasons,
	GridRowModel,
	GridRowModes,
	GridRowModesModel,
	GridRowParams,
	GridToolbar,
	MuiEvent,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";

import { GridRowId } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { Cancel, Delete, EditOutlined, Save } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import "./datagrid.css";
import { CRUDApiType } from "api/crudApi";

type Props = {
	cols: GridColDef[];

	api: any;
};

function DataGridCustom({ cols, api }: Props) {
	const theme = useTheme();
	const [rows, setRows] = useState<any[]>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [severity, setSeverity] = useState<AlertColor>("success");

	const datagridTheme = {
		"& .MuiDataGrid-root": {
			border: "none",
		},
		"& .MuiDataGrid-columnHeaders": {
			backgroundColor: theme.palette.background.default,
			borderBottom: "none",
		},
		"& .MuiDataGrid-virtualScroller": {
			backgroundColor: theme.palette.primary.light,
		},
		"& .MuiDataGrid-footerContainer": {
			backgroundColor: theme.palette.background.default,
			borderTop: "none",
		},
		"& .Mui-error": {
			backgroundColor: `rgb(126,10,15, ${
				theme.palette.mode === "dark" ? 0 : 0.1
			})`,
			color: theme.palette.mode === "dark" ? "#ff4343" : "#750f0f",
		},
	};

	useEffect(() => {
		updateData();
	}, []);

	function updateData() {
		api
			.getAll()
			.then((res: AxiosResponse) => {
				setRows(res.data);
			})
			.catch((_: any) => {
				setErrorMessage("Une erreur est survenue");
				setSeverity("error");
				setOpen(true);
			});
	}

	function putData(newData: any) {
		api
			.update(newData.id, newData)
			.then(() => {
				updateData();
			})
			.catch((_: any) => {
				setErrorMessage("Une erreur est survenue");
				setSeverity("error");
				setOpen(true);
			})
			.finally(() => {
				setSeverity("success");
				setErrorMessage("L'élément a bien été modifié");
				setOpen(true);
			});
	}

	function removeData(id: string) {
		api
			.delete(id)
			.then(() => {
				updateData();
			})
			.catch((_: any) => {
				setErrorMessage("Une erreur est survenue");
				setSeverity("error");
				setOpen(true);
			})
			.finally(() => {
				setSeverity("success");
				setErrorMessage("L'élément a bien été supprimé");
				setOpen(true);
			});
	}

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (
		params,
		event
	) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleRowEditStart = (
		_: GridRowParams<CRUDApiType>,
		event: MuiEvent<React.SyntheticEvent>
	) => {
		event.defaultMuiPrevented = true;
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		setRows(rows.filter((row) => row.id !== id));
		removeData(id as string);
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row.id === id);
		if (editedRow!.isNew) {
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const processRowUpdate = useCallback(
		async (newRow: GridRowModel) => {
			const updatedRow = { ...newRow, isNew: false };
			setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
			putData(updatedRow);
			return updatedRow;
		},
		[rows]
	);

	const onProcessRowUpdateError = useCallback((err: unknown) => {
		console.log(err);
	}, []);

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = [
		...cols,
		{
			flex: 0,
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 100,
			cellClassName: "actions",
			getActions: (params: GridRowParams<CRUDApiType>) => {
				const id = params.id as string; // Assurez-vous que id est une chaîne
				return rowModesModel[id]?.mode === GridRowModes.Edit
					? [
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
					  ]
					: [
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
			<Box className="datagrid-wrapper" sx={datagridTheme}>
				<DataGrid
					loading={!rows}
					density="comfortable"
					rows={rows}
					columns={columns}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					onProcessRowUpdateError={onProcessRowUpdateError}
					onRowEditStart={handleRowEditStart}
					slotProps={{
						toolbar: {
							setRows,
							setRowModesModel,
						},
					}}
					slots={{ toolbar: GridToolbar }}
					sx={{
						width: "90%",
					}}
					initialState={{
						sorting: {
							sortModel: [
								{
									field: "id",
									sort: "asc",
								},
							],
						},
					}}
					isCellEditable={(params) => {
						return params.row.id !== "0";
					}}
				/>
			</Box>
			{/* information popup */}
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					open={open}
					autoHideDuration={2000}
					onClose={() => setOpen(false)}>
					<Alert severity={severity}>{errorMessage}</Alert>
				</Snackbar>
			</Stack>
		</>
	);
}

export default DataGridCustom;
