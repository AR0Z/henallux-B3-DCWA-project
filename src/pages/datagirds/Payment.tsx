import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/DataGridCustom";
import { paymentsApi } from "../../api/paymentsApi";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 50, type: "number" },
	{
		field: "reservation_id",
		headerName: "id_Reservation",
		editable: true,
		width: 130,
		type: "number",
	},
	{
		field: "amount",
		headerName: "Total",
		editable: true,
		width: 130,
		type: "number",
	},
	{
		field: "method",
		headerName: "Méthode",
		type: "singleSelect",
		valueOptions: ["CREDIT_CARD", "PAYPAL"],
		editable: true,
		width: 130,
	},
	{
		field: "payment_status",
		headerName: "Etat",
		type: "singleSelect",
		valueOptions: ["pending", "paid", "failed"],
		editable: true,
		width: 130,
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
