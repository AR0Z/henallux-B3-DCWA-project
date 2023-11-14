import * as React from "react";
import { Avatar, Button, TextField, Box, Typography } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		console.log({ email: data.get("email"), password: data.get("password") });
	}

	return (
		<Box
			sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Log in
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				sx={{
					mt: 1,
				}}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="Username"
					label="Username"
					name="Username"
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}>
					Log In
				</Button>
			</Box>
		</Box>
	);
}
