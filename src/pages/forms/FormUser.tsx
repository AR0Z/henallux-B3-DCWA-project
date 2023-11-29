import { usersApi } from "../../api/usersApi";
import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { User } from "model/User";

function FormUser() {
	const path = "/users";
	const Lines: LineOfForm[] = [
		{
			label: "Nom",
			type: "text",
			id: "lastname",
			required: true,
		},
		{
			label: "Prénom",
			type: "text",
			id: "firstname",
			required: true,
		},
		{
			label: "Email",
			type: "email",
			id: "email",
			required: true,
		},
		{
			label: "Mot de passe",
			type: "password",
			id: "password",
			required: true,
		},
		{
			label: "Téléphone",
			type: "tel",
			id: "phone",
			required: false,
		},
		{
			label: "Date de naissance",
			type: "date",
			id: "dateNaissance",
			required: true,
		},
		{
			label: "Admin",
			type: "checkbox",
			id: "is_admin",
			required: false,
		},
		{
			label: "Driver",
			type: "checkbox",
			id: "is_driver",
			required: false,
		},
		{
			label: "Vehicle",
			type: "number",
			id: "vehicle",
			required: false,
		},
	];

	function newUser(userData: User) {
		usersApi.create({
			firstname: userData.firstname,
			lastname: userData.lastname,
			email: userData.email,
			password: userData.password,
			phone: userData.phone || null,
		});
	}

	return <FormCustom lines={Lines} path={path} newData={newUser}></FormCustom>;
}

export default FormUser;
