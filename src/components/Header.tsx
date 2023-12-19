import { Typography, Box, useTheme, Theme } from "@mui/material";

type Props = {
	title: string;
	subtitle: string;
};

const Header = ({ title, subtitle }: Props) => {
	const theme: Theme = useTheme();
	return (
		<Box>
			<Typography variant="h2" fontWeight="bold" sx={{ mb: "5px" }}>
				{title}
			</Typography>
			<Typography variant="h5" color={theme.palette.secondary.main}>
				{subtitle}
			</Typography>
		</Box>
	);
};

export default Header;
