import { CssBaseline, ThemeProvider, PaletteMode } from "@mui/material";
import { themeSettings } from "./theme.js";
import { createTheme, Theme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useMemo, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login, Dashboard } from "./pages";
import { Layout, LayoutForm, RequireAuth } from "./Layouts";
const Location = lazy(() => import("./pages/datagirds/LocationDatagrid.js"));
const Payment = lazy(() => import("./pages/datagirds/PaymentDatagrid.js"));
const Reservation = lazy(
	() => import("./pages/datagirds/ReservationDatagrid.js")
);
const User = lazy(() => import("./pages/datagirds/UserDatagrid.js"));
const Vehicule = lazy(() => import("./pages/datagirds/VehiculeDatagrid.js"));
const Travel = lazy(() => import("./pages/datagirds/TravelDatagrid.js"));
const FormLocation = lazy(() => import("./pages/forms/FormLocation"));
const FormReservation = lazy(() => import("./pages/forms/FormReservation"));
const FormUser = lazy(() => import("./pages/forms/FormUser"));
const FormVehicule = lazy(() => import("./pages/forms/FormVehicule"));
const FormPayment = lazy(() => import("./pages/forms/FormPayment"));
const FormTravel = lazy(() => import("./pages/forms/FormTravel"));
import CircularProgress from "@mui/material/CircularProgress";
import { AppDispatch, RootState } from "state/store.js";
import { loginWithToken } from "./state/authSlice.js";

const fallback = (
	<div className="loading">
		<CircularProgress />
	</div>
);

function App() {
	const mode = useSelector(
		(state: RootState) => state.theme.mode as PaletteMode
	);
	const theme: Theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	const dispatch = useDispatch<AppDispatch>();
	dispatch(loginWithToken());
	return (
		<>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route element={<RequireAuth />}>
							<Route element={<Layout />}>
								<Route
									path="/"
									element={<Navigate to="/dashboard" replace />}
								/>
								<Route path="/dashboard" element={<Dashboard />} />
								<Route
									path="/locations"
									element={
										<Suspense fallback={fallback}>
											<Location />
										</Suspense>
									}
								/>
								<Route
									path="/payments"
									element={
										<Suspense fallback={fallback}>
											<Payment />
										</Suspense>
									}
								/>
								<Route
									path="/reservations"
									element={
										<Suspense fallback={fallback}>
											<Reservation />
										</Suspense>
									}
								/>
								<Route
									path="/users"
									element={
										<Suspense fallback={fallback}>
											<User />
										</Suspense>
									}
								/>
								<Route
									path="/vehicules"
									element={
										<Suspense fallback={fallback}>
											<Vehicule />
										</Suspense>
									}
								/>
								<Route
									path="/travels"
									element={
										<Suspense fallback={fallback}>
											<Travel />
										</Suspense>
									}
								/>
							</Route>
							<Route element={<LayoutForm />}>
								<Route
									path="/adduser"
									element={
										<Suspense fallback={fallback}>
											<FormUser />
										</Suspense>
									}
								/>
								<Route
									path="/addlocation"
									element={
										<Suspense fallback={fallback}>
											<FormLocation />
										</Suspense>
									}
								/>
								<Route
									path="/addtravel"
									element={
										<Suspense fallback={fallback}>
											<FormTravel />
										</Suspense>
									}
								/>
								<Route
									path="/addreservation"
									element={
										<Suspense fallback={fallback}>
											<FormReservation />
										</Suspense>
									}
								/>
								<Route
									path="/addvehicle"
									element={
										<Suspense fallback={fallback}>
											<FormVehicule />
										</Suspense>
									}
								/>
								<Route
									path="/addpayment"
									element={
										<Suspense fallback={fallback}>
											<FormPayment />
										</Suspense>
									}
								/>
							</Route>
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
