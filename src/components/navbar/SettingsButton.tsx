import { SettingsOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../../state/authSlice";
import { AppDispatch } from "state/store";

function SettingsButton() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen(!open);
	};

	function handleLogout() {
		dispatch(logoutAction());
		navigate("/login");
	}

	return (
		<IconButton onClick={handleMenu}>
			<SettingsOutlined sx={{ fontSize: "25px" }} />
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				sx={{ marginTop: "2rem" }}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={open}>
				<MenuItem onClick={handleLogout}>Log out</MenuItem>
			</Menu>
		</IconButton>
	);
}

export default SettingsButton;
