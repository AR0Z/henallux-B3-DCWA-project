import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";

function Payment() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "fk_reservation", headerName: "id_Reservation" },
		{ field: "amount", headerName: "Total" },
		{ field: "method", headerName: "Méthode" },
		{ field: "status", headerName: "Etat" },
	];

	return (
		<DataGridCustom
			cols={columns}
			title="Payment"
			subtitle="Table des payments"
			data={null}
			path="/addpayment"
		/>
	);
}

export default Payment;
