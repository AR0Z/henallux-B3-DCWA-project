import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useEffect, useState } from "react";
import { paymentsApi } from "../api/paymentsApi";

function Payment() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "reservation_id", headerName: "id_Reservation", editable: true },
		{ field: "amount", headerName: "Total", editable: true },
		{
			field: "method",
			headerName: "Méthode",
			type: "singleSelect",
			valueOptions: ["CREDIT_CARD", "PAYPAL"],
			editable: true,
		},
		{
			field: "payment_status",
			headerName: "Etat",
			type: "singleSelect",
			valueOptions: ["pending", "paid", "failed"],
			editable: true,
		},
	];
	const [data, setData] = useState<any[]>([]);

	function fillState() {
		paymentsApi.getAll().then((res) => {
			setData(res.data);
		});
	}
	useEffect(() => {
		fillState();
	}, []);
	function removeData(id: string) {
		console.log("removed", id);

		paymentsApi
			.delete(id)
			.then((res) => {
				console.log(res);
			})
			.then(() => {
				fillState();
			});
	}

	function updateData(data: any) {
		paymentsApi
			.update(data.id, data)
			.then((res) => {
				console.log(res);
			})
			.then(() => {
				fillState();
			});
	}

	return (
		<DataGridCustom
			cols={columns}
			title="Payment"
			subtitle="Table des payments"
			data={data}
			path="/addpayment"
			updateData={updateData}
			removeData={removeData}
		/>
	);
}

export default Payment;
