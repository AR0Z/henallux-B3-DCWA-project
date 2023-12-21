import { GridColDef } from "@mui/x-data-grid";
import DataGridCustom from "../../components/DataGridCustom";
import { paymentsApi } from "../../api/paymentsApi";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
	document.title = "Payment";
	return (
		<>
			<div className="wrapper">
				<div>
					<Header title={"Payment"} subtitle={"Table des payments"} />
					<Button variant="contained">
						<Link to={"/addpayment"}>Ajouter un élément</Link>
					</Button>
				</div>
				<DataGridCustom cols={columns} api={paymentsApi} />
			</div>
		</>
	);
}

export default Payment;
