import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	return (
		<Box width="100%" height="100%" display="flex">
			<SideBar
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
				drawerWidth="250px"
			/>
			<Box flexGrow={1}>
				<NavBar
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
				<Outlet />
			</Box>
		</Box>
	);
}

export default Layout;
