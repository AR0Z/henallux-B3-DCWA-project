import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { vehiculesApi } from "../../api/vehiclesApi";

const Lines: LineOfForm[] = [
	{
		label: "brand",
		type: "text",
		id: "brand",
		required: true,
	},
	{
		label: "model",
		type: "text",
		id: "model",
		required: true,
	},
	{
		label: "color",
		type: "text",
		id: "color",
		required: true,
	},
	{
		label: "nbPlace",
		type: "number",
		id: "nbPlace",
		required: true,
	},
];

const baseData = {
	brand: "",
	model: "",
	color: "",
	nbPlace: 0,
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
