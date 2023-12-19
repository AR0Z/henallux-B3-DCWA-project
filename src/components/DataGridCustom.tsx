import {
	Alert,
	Box,
	Button,
	Snackbar,
	Stack,
	Theme,
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
	GridToolbar,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { GridRowId, GridRowParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Cancel, Delete, EditOutlined, Save } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import "./datagrid.css";
import { CRUDApi, CRUDApiType } from "../api/crudApi";

type Props = {
	title: string;
	subtitle: string;
	cols: GridColDef[];
	path: string;
	api: CRUDApi;
};

type Severity = "success" | "error" | "info";

function DataGridCustom({ title, subtitle, cols, path, api }: Props) {
	const theme: Theme = useTheme();
	const [rows, setRows] = useState<CRUDApiType[]>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [severity, setSeverity] = useState<Severity>("success");
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
			.catch(() => {
				setErrorMessage("Une erreur est survenue");
				setSeverity("error");
				setOpen(true);
			});
	}

	function putData(newData: CRUDApiType) {
		if (newData.id)
			api
				.update(newData.id, newData)
				.then(() => {
					updateData();
				})
				.catch(() => {
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
			.catch(() => {
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

	function handleEditClick(id: GridRowId) {
		return () => {
			setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
		};
	}

	function handleSaveClick(id: GridRowId) {
		return () => {
			setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
		};
	}

	function handleDeleteClick(id: GridRowId) {
		return () => {
			if (!window.confirm("Are you sure you want to delete this item?")) return;
			const itemToDelete = rows.find((row: CRUDApiType) => row.id === id);
			if (itemToDelete?.id) removeData(itemToDelete.id);
			setRows(rows.filter((row: CRUDApiType) => row.id !== id));
		};
	}

	function handleCancelClick(id: GridRowId) {
		return () => {
			setRowModesModel({
				...rowModesModel,
				[id]: { mode: GridRowModes.View, ignoreModifications: true },
			});
			const editedRow = rows.find((row: CRUDApiType) => row.id === id);
			if (editedRow!.isNew) {
				setRows(rows.filter((row: CRUDApiType) => row.id !== id));
			}
			setSeverity("info");
			setErrorMessage("L'élément n'a pas été modifié");
			setOpen(true);
		};
	}

	function processRowUpdate(newRow: GridRowModel) {
		const updatedRow: CRUDApiType = { ...newRow, isNew: false } as CRUDApiType;
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		putData(updatedRow);
		return updatedRow;
	}

	function handleRowModesModelChange(newRowModesModel: GridRowModesModel) {
		setRowModesModel(newRowModesModel);
	}

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
			<div className="wrapper">
				{/* Header */}
				<div>
					<Header title={title} subtitle={subtitle} />
					<Button variant="contained">
						<Link to={path}>Ajouter un élément</Link>
					</Button>
				</div>
				{/* Datagrid */}
				<Box className="datagrid-wrapper" sx={datagridTheme}>
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
							toolbar: {
								showQuickFilter: true,
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
					/>
				</Box>
			</div>
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
