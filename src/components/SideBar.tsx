import React from "react";
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemButton,
	Typography,
	useTheme,
} from "@mui/material";

import {
	SettingsOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	HomeOutlined,
	DirectionsCarOutlined,
	PersonOutlineOutlined,
	PaymentOutlined,
	MapOutlined,
	BookOnlineOutlined,
	LocationOnOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

interface NavItemProps {
	text: string;
	icon: React.ReactNode;
	path: string;
}

const navItems: NavItemProps[] = [
	{
		text: "Home",
		icon: <HomeOutlined />,
		path: "/",
	},
	{
		text: "Vehicules",
		icon: <DirectionsCarOutlined />,
		path: "/vehicules",
	},
	{
		text: "Users",
		icon: <PersonOutlineOutlined />,
		path: "/users",
	},
	{
		text: "Payments",
		icon: <PaymentOutlined />,
		path: "/payments",
	},
	{
		text: "Locations",
		icon: <LocationOnOutlined />,
		path: "/locations",
	},
	{
		text: "Bookings",
		icon: <BookOnlineOutlined />,
		path: "/reservations",
	},
	{
		text: "Maps",
		icon: <MapOutlined />,
		path: "/rides",
	},
];

function SideBar({
	isSidebarOpen,
	setIsSidebarOpen,
	drawerWidth,
}: {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Function;
	drawerWidth: string;
}) {
	const { pathname } = useLocation();
	const [active, setActive] = useState<string>("");
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<Box component="nav">
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant="persistent"
					anchor="left"
					sx={{
						width: drawerWidth,
						[`& .MuiDrawer-paper`]: {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.primary[800],
							borderWidth: "0px",
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}>
					<Box width="100%">
						<Box ml="2rem" mt="1rem" mb="1rem">
							<FlexBetween color={theme.palette.primary.main}>
								<Box display="flex" alignItems="center" gap="0.5rem">
									<Typography variant="h4" fontWeight="bold">
										<ListItem onClick={() => navigate("/")}>
											CarpoolConnect
										</ListItem>
									</Typography>
								</Box>
							</FlexBetween>
						</Box>
					</Box>
					<Divider />
					<List>
						{navItems.map((item) => (
							<ListItem key={item.text} disablePadding>
								<ListItemButton
									onClick={() => {
										navigate(item.path);
										setActive(item.path);
									}}
									selected={active === item.path}
									sx={{
										backgroundColor:
											active === item.text
												? theme.palette.secondary[300]
												: "transparent",
										color:
											active === item.text
												? theme.palette.primary[600]
												: theme.palette.secondary[100],
										"&:hover": {
											backgroundColor: theme.palette.secondary[300],
											color: theme.palette.primary[600],
										},
										marginTop: "1rem",
									}}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<Typography variant="h6" fontWeight="bold">
										{item.text}
									</Typography>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Drawer>
			)}
		</Box>
	);
}

export default SideBar;
