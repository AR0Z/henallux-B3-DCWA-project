import { useState } from "react";
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";

const NavBar = lazy(() => import("../../components/navbar/NavBar"));
const SideBar = lazy(() => import("../../components/sidebar/SideBar"));
import "./base-layout.css";
import CircularProgress from "@mui/material/CircularProgress";

const fallback = (
	<div className="loading">
		<CircularProgress />
	</div>
);

function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	return (
		<div id="wrapper-layout">
			<Suspense fallback={fallback}>
				<SideBar
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
			</Suspense>
			<Suspense fallback={fallback}>
				<div id="wrapper-layout-navbar">
					<NavBar
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
					/>
					<Outlet />
				</div>
			</Suspense>
		</div>
	);
}

export default Layout;
