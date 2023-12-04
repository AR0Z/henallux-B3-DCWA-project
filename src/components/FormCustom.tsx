import {
	Autocomplete,
	Button,
	FormControl,
	FormLabel,
	TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { LineOfForm } from "../model/FormTypes";
import FlexBetween from "./FlexBetween";
import { Link, useNavigate } from "react-router-dom";

type Props = {
	lines: LineOfForm[];
	path: string;
	api: any;
	baseData: Object;
};

function FormCustom<T>({ lines, path, api, baseData }: Props) {
	const [data, setData] = useState<any>(baseData);

	const navigate = useNavigate();

	function newData() {
		api.create(data);
	}

	function handleSubmit(event: any) {
		event.preventDefault();
		newData();
		if (window.confirm("Êtes-vous sûr de vouloir envoyer ce formulaire ?")) {
			navigate(path);
		}
	}

	function getDate(line: LineOfForm) {
		return (
			<>
				<FormControl fullWidth>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label={line.label}
							onChange={(date) => setData({ ...data, [line.id]: date })}
							slotProps={{
								textField: {
									required: true,
								},
							}}
							format="DD/MM/YYYY"
						/>
					</LocalizationProvider>
				</FormControl>
			</>
		);
	}

	function getCheckBox(line: LineOfForm) {
		return (
			<FormControl fullWidth>
				<FormLabel htmlFor={line.id}>{line.label}</FormLabel>
				<TextField
					id={line.id}
					variant="outlined"
					color="primary"
					type="checkbox"
					onChange={(event) => {
						console.log(event.target.checked);
						setData({ ...data, [line.id]: event.target.checked });
					}}
				/>
			</FormControl>
		);
	}

	function getComboBox(line: LineOfForm) {
		return (
			<FormControl fullWidth>
				<Autocomplete
					id={line.id}
					color="primary"
					options={line.options}
					renderInput={(params) => <TextField {...params} label={line.id} />}
					onChange={(e, value) => {
						setData({ ...data, [line.label]: value });
					}}
				/>
			</FormControl>
		);
	}

	function getFormControl(line: LineOfForm) {
		switch (line.type) {
			case "text":
			case "number":
			case "password":
			case "email":
			case "tel":
				return (
					<FormControl fullWidth>
						<TextField
							id={line.id}
							label={line.label}
							variant="outlined"
							color="primary"
							type={line.type}
							onChange={(event) => {
								setData({ ...data, [line.id]: event.target.value });
							}}
							required={line.required}
						/>
					</FormControl>
				);

			case "date":
				return getDate(line);
			case "checkbox":
				return getCheckBox(line);
			case "combobox":
				return getComboBox(line);
			default:
				return <></>;
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: "1rem",
				}}>
				{lines.map((line) => getFormControl(line))}
				<FlexBetween width={"80%"}>
					<Button type="button" variant="outlined" color="primary">
						<Link to={path}>Cancel</Link>
					</Button>

					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
				</FlexBetween>
			</form>
		</>
	);
}

export default FormCustom;
