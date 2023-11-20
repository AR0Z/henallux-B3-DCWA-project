import {
	CheckCircle,
	TrendingDown,
	TrendingFlat,
	TrendingUp,
} from "@mui/icons-material";
import { Box, CardContent, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";

type Icons = "valid" | "rising" | "decreasing" | "flat";

type Props = {
	icon: Icons;
	data?: number;
	label: string;
};

function getIconFromName(name: Icons) {
	switch (name) {
		case "valid":
			return <CheckCircle />;
		case "rising":
			return <TrendingUp />;
		case "decreasing":
			return <TrendingDown />;
		case "flat":
			return <TrendingFlat />;
	}
}

function InfoCard({ icon, data, label }: Props) {
	return (
		<Card sx={{ width: "12rem", height: "12rem" }}>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: "1rem",
					height: "100%",
				}}>
				{/* Top icon */}
				<Box>{getIconFromName(icon)}</Box>
				{/* data */}
				<Box>{data ? <h1>{data}</h1> : <CircularProgress />}</Box>
				{/* label */}
				<Box>
					<h4>{label}</h4>
				</Box>
			</CardContent>
		</Card>
	);
}

export default InfoCard;
