import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";

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

	return <FormCustom lines={Lines} path={path}></FormCustom>;
}

export default FormUser;
