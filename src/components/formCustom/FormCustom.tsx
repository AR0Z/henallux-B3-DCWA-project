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
} from "../../model/FormTypes";
import FlexBetween from "../stylingComponents/FlexBetween";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import dayjs from "dayjs";

import { CRUDApi, CRUDApiType } from "api/crudApi";

type Props = {
	lines: LineOfForm[];
	path: string;
	api: CRUDApi;
	baseData: CRUDApiType;
};

function FormCustom({ lines, path, api, baseData }: Props) {
	const [data, setData] = useState<CRUDApiType>(baseData);
	const [formError, setFormError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [displayError, setDisplayError] = useState(false);
	const navigate = useNavigate();

	function newData() {
		api.create(data);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (formError) {
			setDisplayError(true);
		} else {
			if (window.confirm("Êtes-vous sûr de vouloir envoyer ce formulaire ?")) {
				newData();
				navigate(path);
			}
		}
	}

	function getDate(line: LineOfForm, index: number) {
		return (
			<>
				<FormControl fullWidth key={index}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label={line.label}
							onChange={(value: any) => {
								setData({
									...data,
									[line.id]: new Date(value).getTime(),
								});
							}}
							slotProps={{
								textField: {
									required: true,
								},
							}}
							format="DD/MM/YYYY"
							minDate={dayjs()}
						/>
					</LocalizationProvider>
				</FormControl>
			</>
		);
	}

	function getCheckBox(line: LineOfForm, index: number) {
		return (
			<FormControl className="checkbox-wrapper" key={index}>
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

	function getComboBox(line: LineOfForm & ComboBoxAttributes, index: number) {
		return (
			<FormControl fullWidth key={index}>
				<Autocomplete
					id={line.id}
					color="primary"
					options={line.options}
					renderInput={(params) => <TextField {...params} label={line.label} />}
					onChange={(_, value) => {
						setData({ ...data, [line.id]: value });
					}}
					title={line.label}
				/>
			</FormControl>
		);
	}

	function getComboBoxObject(
		line: LineOfForm & ComboBoxAttributesObject,
		index: number
	) {
		return (
			<FormControl fullWidth key={index}>
				<Autocomplete
					id={line.id}
					color="primary"
					options={line.options}
					getOptionLabel={(option) => option.label}
					renderInput={(params) => <TextField {...params} label={line.id} />}
					onChange={(_, field) => {
						setData({ ...data, [line.id]: field?.value });
					}}
					title={line.label}
				/>
			</FormControl>
		);
	}

	function getTextArea(line: LineOfForm, index: number) {
		return (
			<FormControl fullWidth key={index}>
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

	function getFormControl(line: LineOfForm, index: number) {
		switch (line.type) {
			case "text":
			case "password":
			case "email":
			case "tel":
				const [isValid, setIsValid] = useState(true);

				return (
					<FormControl fullWidth key={index}>
						<TextField
							id={line.id}
							label={line.label}
							variant="outlined"
							color="primary"
							type={line.type}
							onChange={(event) => {
								if (line.regex) {
									setIsValid(line.regex.test(event.target.value));
									if (!line.regex.test(event.target.value)) {
										setErrorMessage(
											"erreur de format a la ligne " + line.label
										);
										setFormError(true);
									} else {
										setFormError(false);
									}
								}
								setData({ ...data, [line.id]: event.target.value });
							}}
							required={line.required}
							error={line.regex && !isValid}
							helperText={line.helperText && !isValid ? line.helperText : ""}
						/>
					</FormControl>
				);

			case "number":
				return (
					<FormControl fullWidth key={index}>
						<TextField
							id={line.id}
							label={line.label}
							variant="outlined"
							color="primary"
							type={line.type}
							onChange={(event) => {
								if (parseInt(event.target.value) <= 0) {
									event.target.value = "0";
								}
								setData({ ...data, [line.id]: parseInt(event.target.value) });
							}}
							required={line.required}
							helperText={line.helperText ? line.helperText : ""}
						/>
					</FormControl>
				);
			case "date":
				return getDate(line, index);
			case "checkbox":
				return getCheckBox(line, index);
			case "combobox":
				return getComboBox(line, index);
			case "comboboxObject":
				return getComboBoxObject(line, index);
			case "textarea":
				return getTextArea(line, index);
			default:
				return <></>;
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-wrapper">
				{lines.map((line, index) => {
					return getFormControl(line, index);
				})}
				{displayError && <div style={{ color: "red" }}>{errorMessage}</div>}
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
