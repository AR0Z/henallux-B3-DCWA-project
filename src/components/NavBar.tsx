import { Menu as MenuIcon } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

import { AppBar, IconButton, Toolbar } from "@mui/material";
import SwitchThemeButton from "./SwitchThemeButton";
import SettingsButton from "./SettingsButton";

type Props = {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Function;
};

export default function NavBar({ isSidebarOpen, setIsSidebarOpen }: Props) {
	return (
		<AppBar
			sx={{
				position: "sticky",
				background: "none",
				boxShadow: "none",
				height: "4rem",
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
					<SettingsButton />
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
}
