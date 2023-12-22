import FormCustom from "../../components/formCustom/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { vehiculesApi } from "../../api/vehiclesApi";
import { brands, models, color } from "../../assets/vehiculesData";
import { getUserEmailsID } from "../../api/api";
import { plateRegex } from "../../components/utils";

const {
	usersOptions,
	usersEmails,
	userIds,
}: {
	usersOptions: { value?: string; label: string }[];
	usersEmails: string[];
	userIds: string[];
} = getUserEmailsID(true);

const Lines: LineOfForm[] = [
	{
		label: "brand",
		type: "combobox",
		id: "brand",
		required: true,
		options: brands,
	},
	{
		label: "model",
		type: "combobox",
		id: "model",
		required: true,
		options: models,
	},
	{
		label: "color",
		type: "combobox",
		id: "color",
		required: true,
		options: color,
	},
	{
		label: "nombre de place",
		type: "number",
		id: "nbSeats",
		required: true,
	},
	{
		label: "plate",
		type: "text",
		id: "plate",
		required: true,
		regex: plateRegex,
		helperText: "Format: 0-XXX-000",
	},
	{
		label: "id du conducteur",
		type: "comboboxObject",
		id: "ownerId",
		required: true,
		options: usersOptions,
		optionsValues: userIds,
		optionsLabels: usersEmails,
	},
];

const baseData = {
	brand: "",
	model: "",
	color: 0,
	nbSeats: 0,
	isNew: true,
};
const path = "/vehicules";
function FormVehicule() {
	return (
		<FormCustom
			lines={Lines}
			path={path}
			api={vehiculesApi}
			baseData={baseData}
		/>
	);
}

export default FormVehicule;
