import {
	CheckCircle,
	TrendingDown,
	TrendingFlat,
	TrendingUp,
} from "@mui/icons-material";
import { Box, CardContent, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";

type Icons = "valid" | "rising" | "decreasing" | "flat";

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

function InfoCard(props: { icon: Icons; data?: number; label: string }) {
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
				<Box>{getIconFromName(props.icon)}</Box>
				{/* data */}
				<Box>{props.data ? <h1>{props.data}</h1> : <CircularProgress />}</Box>
				{/* label */}
				<Box>
					<h4>{props.label}</h4>
				</Box>
			</CardContent>
		</Card>
	);
}

export default InfoCard;
