import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { paymentsApi } from "../api/paymentsApi";

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

function Payment() {
	return (
		<DataGridCustom
			cols={columns}
			title="Payment"
			subtitle="Table des payments"
			path="/addpayment"
			api={paymentsApi}
		/>
	);
}

export default Payment;
