import { useState } from "react";
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
const NavBar = lazy(() => import("../components/NavBar"));
const SideBar = lazy(() => import("../components/SideBar"));
import "../styles/base-layout.css";

function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	return (
		<div id="wrapper-layout">
			<Suspense fallback={<div>Loading...</div>}>
				<SideBar
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
			</Suspense>
			<Suspense fallback={<div>Loading...</div>}>
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
