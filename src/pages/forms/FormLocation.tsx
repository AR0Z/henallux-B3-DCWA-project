import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { locationsApi } from "../../api/locationsApi";

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
		type: "text",
		required: true,
	},
	{
		label: "longitude",
		id: "longitude",
		type: "text",
		required: true,
	},
	{
		label: "nextStopsId",
		id: "nextStopsId",
		type: "text",
		required: false,
	},
];
const baseData = {
	label: "",
	latitude: 0,
	longitude: 0,
	nextStopsId: "",
	isNew: true
};
function FormLocation() {
	return (
		<FormCustom
			lines={Lines}
			path={path}
			baseData={baseData}
			api={locationsApi}
		/>
	);
}

export default FormLocation;
