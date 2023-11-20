import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../components/DataGridCustom";
import { useState } from "react";

function Payment() {
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID" },
		{ field: "fk_reservation", headerName: "id_Reservation" },
		{ field: "amount", headerName: "Total" },
		{ field: "method", headerName: "Méthode" },
		{ field: "status", headerName: "Etat" },
	];
	const [data, setData] = useState<any[]>([]);

	return (
		<DataGridCustom
			cols={columns}
			title="Payment"
			subtitle="Table des payments"
			data={data}
			path="/addpayment"
			setData={setData}
		/>
	);
}

export default Payment;
