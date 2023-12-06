import React from "react";
import {
	Divider,
	Drawer,
	ListItem,
	ListItemIcon,
	ListItemButton,
	Typography,
	useTheme,
} from "@mui/material";

import {
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
import "../styles/sidebar.css";

type NavItemProps = {
	text: string;
	icon: React.ReactNode;
	path: string;
};

type Props = {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Function;
};

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
		text: "Travels",
		icon: <MapOutlined />,
		path: "/travels",
	},
];

const drawerWidth = "15rem";

function SideBar({ isSidebarOpen, setIsSidebarOpen }: Props) {
	const { pathname } = useLocation();
	const [active, setActive] = useState<string>("");
	const navigate = useNavigate();
	const theme: any = useTheme();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<nav>
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
					<div id="title-wrapper">
						<div id="title">
							<Typography
								variant="h4"
								fontWeight="bold"
								color={theme.palette.primary.main}>
								<ListItem onClick={() => navigate("/")}>
									CarpoolConnect
								</ListItem>
							</Typography>
						</div>
					</div>
					<Divider />
					<ul>
						{navItems.map((item) => (
							<>
								<ListItem key={item.text} className="sidebar-items">
									<ListItemButton
										className="sidebar-btn"
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
										}}>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<Typography variant="h6" fontWeight="bold">
											{item.text}
										</Typography>
									</ListItemButton>
								</ListItem>
							</>
						))}
					</ul>
				</Drawer>
			)}
		</nav>
	);
}

export default SideBar;
