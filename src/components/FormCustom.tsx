import {
	Autocomplete,
	Button,
	FormControl,
	FormLabel,
	TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, ChangeEvent, FormEvent } from "react";
import {
	ComboBoxAttributes,
	ComboBoxAttributesObject,
	LineOfForm,
} from "../model/FormTypes";
import FlexBetween from "./FlexBetween";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";

import { CRUDApi, CRUDApiType } from "api/crudApi";

type Props = {
	lines: LineOfForm[];
	path: string;
	api: CRUDApi;
	baseData: CRUDApiType;
};

function FormCustom({ lines, path, api, baseData }: Props) {
	const [data, setData] = useState<CRUDApiType>(baseData);

	const navigate = useNavigate();

	function newData() {
		api.create(data);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (window.confirm("Êtes-vous sûr de vouloir envoyer ce formulaire ?")) {
			newData();
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
			<FormControl className="checkbox-wrapper">
				<FormLabel htmlFor={line.id} className="checkbox-label">
					{line.label}
				</FormLabel>
				<TextField
					id={line.id}
					type="checkbox"
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						setData({ ...data, [line.id]: event.target.checked });
					}}
					className="checkbox"
				/>
			</FormControl>
		);
	}

	function getComboBox(line: LineOfForm & ComboBoxAttributes) {
		return (
			<FormControl fullWidth>
				<Autocomplete
					id={line.id}
					color="primary"
					options={line.options}
					renderInput={(params) => <TextField {...params} label={line.id} />}
					onChange={(_, value) => {
						setData({ ...data, [line.label]: value });
					}}
				/>
			</FormControl>
		);
	}

	function getComboBoxObject(line: LineOfForm & ComboBoxAttributesObject) {
		return (
			<FormControl fullWidth>
				<Autocomplete
					id={line.id}
					color="primary"
					options={line.options}
					getOptionLabel={(option) => option.label}
					renderInput={(params) => <TextField {...params} label={line.id} />}
					// type of line is {label: string, value: string} send only value
					onChange={(_, field) => {
						setData({ ...data, [line.id]: field?.value });
					}}
				/>
			</FormControl>
		);
	}

	function getTextArea(line: LineOfForm) {
		return (
			<FormControl fullWidth>
				<TextField
					id={line.id}
					label={line.label}
					variant="outlined"
					color="primary"
					type="textarea"
					onChange={(event) => {
						setData({ ...data, [line.id]: event.target.value });
					}}
					required={line.required}
					multiline
					rows={4}
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
			case "comboboxObject":
				return getComboBoxObject(line);
			case "textarea":
				return getTextArea(line);
			default:
				return <></>;
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-wrapper">
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
