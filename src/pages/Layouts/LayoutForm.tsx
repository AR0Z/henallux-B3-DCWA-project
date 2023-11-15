import { Box } from "@mui/material";
import SwitchThemeButton from "../../components/SwitchThemeButton";
import { Outlet } from "react-router-dom";

function LayoutForm() {
	return (
		<>
			<Box position="absolute" top="0" right="0" m="1rem">
				<SwitchThemeButton />
			</Box>
			<Box
				height="100%"
				display="flex"
				alignItems="center"
				justifyContent="center">
				<Outlet />
			</Box>
		</>
	);
}

export default LayoutForm;
