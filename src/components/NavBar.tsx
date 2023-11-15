import { Menu as MenuIcon, SettingsOutlined } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

import { AppBar, IconButton, Toolbar } from "@mui/material";
import SwitchThemeButton from "./SwitchThemeButton";

export default function NavBar({
	isSidebarOpen,
	setIsSidebarOpen,
}: {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Function;
}) {
	isSidebarOpen;
	setIsSidebarOpen;

	return (
		<AppBar
			sx={{
				position: "sticky",
				background: "none",
				boxShadow: "none",
			}}>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{/* Gauche */}
				<FlexBetween>
					<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						<MenuIcon />
					</IconButton>
				</FlexBetween>

				{/* Droite */}
				<FlexBetween gap="1.5rem">
					<SwitchThemeButton />
					<IconButton>
						<SettingsOutlined sx={{ fontSize: "25px" }} />
					</IconButton>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
}
