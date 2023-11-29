import FormCustom from "../../components/FormCustom";
import { LineOfForm } from "../../model/FormTypes";
import { locationsApi } from "../../api/locationsApi";

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

	function newLocation(data: any) {
		console.log(data);

		locationsApi.create({
			label: data.label,
			latitude: parseFloat(data.latitude),
			longitude: parseFloat(data.longitude),
			nextStopsId: data.nextStopsId || null,
		});
	}

	return (
		<FormCustom lines={Lines} path={path} newData={newLocation}></FormCustom>
	);
}

export default FormLocation;
