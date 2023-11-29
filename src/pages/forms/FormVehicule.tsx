import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { vehiclesApi } from "../../api/vehiclesApi";
function FormVehicule() {
	const path = "/vehicules";
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

	function newVehicule(data: any) {
		vehiclesApi.create(data);
	}

	return <FormCustom lines={Lines} path={path} newData={newVehicule} />;
}

export default FormVehicule;
