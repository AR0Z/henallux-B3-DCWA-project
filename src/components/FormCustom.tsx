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
import { Navigate } from "react-router-dom";

function FormCustom(props: { lines: LineOfForm[]; path: string }) {
	const [data, setData] = useState<any>({});

	function handleSubmit(event: any) {
		event.preventDefault();
		if (window.confirm("Êtes-vous sûr de vouloir envoyer ce formulaire ?")) {
			window.location.href = props.path;
			console.log(data);
		} else {
			console.log("Annulation de l'envoi du formulaire");
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
				{props.lines.map((line, index) => {
					switch (line.type) {
						case "text":
						case "number":
						case "password":
						case "email":
						case "tel":
							return (
								<FormControl key={index} fullWidth>
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
							return (
								<FormControl key={index} fullWidth>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											label={line.label}
											onChange={(date) => {
												console.log(line.id, date);
												setData({ ...data, [line.id]: date });
											}}
											slotProps={{
												textField: {
													required: true,
												},
											}}
										/>
									</LocalizationProvider>
								</FormControl>
							);
						case "checkbox":
							return (
								<FormControl key={index} fullWidth>
									<FormLabel htmlFor={line.id}>{line.label}</FormLabel>
									<TextField
										id={line.id}
										variant="outlined"
										color="primary"
										type={line.type}
										onChange={(event) => {
											setData({ ...data, [line.id]: event.target.value });
										}}
									/>
								</FormControl>
							);
						default: // comboBox
							return (
								<FormControl key={index} fullWidth>
									<Autocomplete
										id={line.id}
										color="primary"
										options={line.type.options}
										renderInput={(params) => (
											<TextField {...params} label={line.id} />
										)}
										onChange={(value) => {
											setData({ ...data, [line.id]: value });
										}}
									/>
								</FormControl>
							);
					}
				})}
				<Button type="submit" variant="contained" color="primary">
					Submit
				</Button>
			</form>
		</>
	);
}

export default FormCustom;
