import { passwordRegex } from "../../components/utils";
import { usersApi } from "../../api/usersApi";
import FormCustom from "../../components/formCustom/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
const path = "/users";

/*
    faceImage?: string;
    drivingLicence?: string;
    tokenImg?: string;
*/
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
		regex: passwordRegex,
		helperText: "8 caractères dont 1 chiffre et 1 majuscule",
	},
	{
		label: "Téléphone",
		type: "tel",
		id: "phone",
		required: true,
		regex: /^0[1-9]([-. ]?[0-9]{2}){4,}$/,
		helperText: "Numéro de téléphone invalide",
	},
	{
		label: "Admin",
		type: "checkbox",
		id: "isAdmin",
		required: false,
	},
	{
		label: "Driver",
		type: "checkbox",
		id: "isDriver",
		required: false,
	},

	{
		label: "Description",
		type: "textarea",
		id: "descProfile",
		required: false,
	},
];
const baseData = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	phone: "",
	isAdmin: false,
	isDriver: false,
	descProfile: "",
	vehicle: "",
	isNew: true,
};

function FormUser() {
	return (
		<FormCustom lines={Lines} path={path} api={usersApi} baseData={baseData} />
	);
}

export default FormUser;
