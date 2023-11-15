import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";

function FormLocation() {
	const path = "/locations";
	const Lines: LineOfForm[] = [
		{
			label: "label",
			id: "label",
			type: "text",
			required: true,
		},
		{
			label: "latitude",
			id: "latitude",
			type: "number",
			required: true,
		},
		{
			label: "longitude",
			id: "longitude",
			type: "number",
			required: true,
		},
		{
			label: "nextStopsId",
			id: "nextStopsId",
			type: "text",
			required: false,
		},
	];

	return <FormCustom lines={Lines} path={path}></FormCustom>;
}

export default FormLocation;
