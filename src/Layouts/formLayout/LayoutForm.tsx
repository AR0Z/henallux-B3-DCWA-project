import { Box } from "@mui/material";
import SwitchThemeButton from "../../components/navbar/SwitchThemeButton";
import { Outlet } from "react-router-dom";
import "./form-layout.css";

function LayoutForm() {
	return (
		<>
			<Box className="switch-theme-button">
				<SwitchThemeButton />
			</Box>
			<Box className="wrapper-form">
				<Outlet />
			</Box>
		</>
	);
}

export default LayoutForm;
