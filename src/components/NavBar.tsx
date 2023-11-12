import React, { useState } from "react";
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	SettingsOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import { useTheme } from "@mui/material/";
import { AppBar, IconButton, Toolbar } from "@mui/material";

export default function NavBar({
	isSidebarOpen,
	setIsSidebarOpen,
}: {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Function;
}) {
	isSidebarOpen;
	setIsSidebarOpen;
	const dispatch = useDispatch();
	const theme = useTheme();

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
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === "light" ? (
							<LightModeOutlined sx={{ fontSize: "25px" }} />
						) : (
							<DarkModeOutlined sx={{ fontSize: "25px" }} />
						)}
					</IconButton>
					<IconButton>
						<SettingsOutlined sx={{ fontSize: "25px" }} />
					</IconButton>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
}
