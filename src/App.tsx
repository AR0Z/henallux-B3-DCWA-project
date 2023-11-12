import { CssBaseline, ThemeProvider } from "@mui/material";
// @ts-ignore
import { themeSettings } from "./theme.js";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import Dashboard from "./pages/Dashboard";
import Location from "./pages/Location";
import Payment from "./pages/Payment";
import Reservation from "./pages/Reservation";
import User from "./pages/User";
import Vehicule from "./pages/Vehicule";
import Travel from "./pages/Travel";

function App() {
	const mode = useSelector((state: any) => state.theme.mode);
	const theme: any = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return (
		<>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<Navigate to="/dashboard" replace />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/locations" element={<Location />} />
							<Route path="/payments" element={<Payment />} />
							<Route path="/reservations" element={<Reservation />} />
							<Route path="/users" element={<User />} />
							<Route path="/vehicules" element={<Vehicule />} />
							<Route path="/rides" element={<Travel />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
