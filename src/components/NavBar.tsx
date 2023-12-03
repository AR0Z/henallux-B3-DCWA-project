import { Menu as MenuIcon, SettingsOutlined } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

import {
	AppBar,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import SwitchThemeButton from "./SwitchThemeButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Function;
};

export default function NavBar({ isSidebarOpen, setIsSidebarOpen }: Props) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();
	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function handleLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		navigate("/login");
	}

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
					<IconButton onClick={handleMenu}>
						<SettingsOutlined sx={{ fontSize: "25px" }} />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}>
						<MenuItem onClick={handleLogout}>Log out</MenuItem>
					</Menu>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
}
