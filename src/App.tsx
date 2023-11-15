import { CssBaseline, ThemeProvider } from "@mui/material";
// @ts-ignore
import { themeSettings } from "./theme.js";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layouts/Layout.js";
import Dashboard from "./pages/Dashboard";
import Location from "./pages/Location";
import Payment from "./pages/Payment";
import Reservation from "./pages/Reservation";
import User from "./pages/User";
import Vehicule from "./pages/Vehicule";
import Travel from "./pages/Travel";
import Login from "./pages/Login";
import LayoutForm from "./pages/Layouts/LayoutForm.js";
import FormLocation from "./pages/forms/FormLocation";
import FormReservation from "./pages/forms/FormReservation";
import FormUser from "./pages/forms/FormUser";
import FormVehicule from "./pages/forms/FormVehicule";
import FormPayment from "./pages/forms/FormPayment";
import FormTravel from "./pages/forms/FormTravel";

function App() {
	const mode = useSelector((state: any) => state.theme.mode);
	const theme: any = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return (
		<>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route element={<Layout />}>
							<Route path="/" element={<Navigate to="/dashboard" replace />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/locations" element={<Location />} />
							<Route path="/payments" element={<Payment />} />
							<Route path="/reservations" element={<Reservation />} />
							<Route path="/users" element={<User />} />
							<Route path="/vehicules" element={<Vehicule />} />
							<Route path="/travels" element={<Travel />} />
						</Route>
						<Route element={<LayoutForm />}>
							<Route path="/adduser" element={<FormUser />} />
							<Route path="/addlocation" element={<FormLocation />} />
							<Route path="/addtravel" element={<FormTravel />} />
							<Route path="/addreservation" element={<FormReservation />} />
							<Route path="/addvehicle" element={<FormVehicule />} />
							<Route path="/addpayment" element={<FormPayment />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
