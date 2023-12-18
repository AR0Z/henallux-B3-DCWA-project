import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { vehiculesApi } from "../../api/vehiclesApi";
import { brands, models, color } from "../../assets/vehiculesData";
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
];

const baseData = {
	brand: "",
	model: "",
	color: 0,
	nbSeats: 0,
	isNew: true
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
