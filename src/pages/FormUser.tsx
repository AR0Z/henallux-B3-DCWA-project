import { Box } from "@mui/material";
import FormCustom from "../components/FormCustom";
import { LineOfForm } from "../model/FormTypes";

function FormUser() {
	const path = "/users";
	const Lines: LineOfForm[] = [
		{
			label: "Nom",
			type: "text",
			id: "nom",
			required: true,
		},
		{
			label: "Prénom",
			type: "text",
			id: "prenom",
			required: true,
		},
		{
			label: "Email",
			type: "email",
			id: "email",
			required: true,
		},
		{
			label: "Téléphone",
			type: "tel",
			id: "telephone",
			required: false,
		},
		{
			label: "Date de naissance",
			type: "date",
			id: "dateNaissance",
			required: true,
		},
	];

	return (
		<Box
			height="100%"
			display="flex"
			alignItems="center"
			justifyContent="center">
			<FormCustom lines={Lines} path={path}></FormCustom>
		</Box>
	);
}

export default FormUser;
