import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";

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

	return <FormCustom lines={Lines} path={path} />;
}

export default FormVehicule;
