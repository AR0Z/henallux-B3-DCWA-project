import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { setMode } from "../state/themeSlice";

function SwitchThemeButton() {
	const dispatch = useDispatch();
	const theme = useTheme();
	return (
		<IconButton onClick={() => dispatch(setMode())}>
			{theme.palette.mode === "light" ? (
				<LightModeOutlined sx={{ fontSize: "25px" }} />
			) : (
				<DarkModeOutlined sx={{ fontSize: "25px" }} />
			)}
		</IconButton>
	);
}

export default SwitchThemeButton;
