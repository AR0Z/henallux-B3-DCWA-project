import * as React from "react";
import { Avatar, Button, TextField, Box, Typography } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SwitchThemeButton from "../components/SwitchThemeButton";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../state/authApiSlice";
import { setCredentials } from "../state/authSlice";

export default function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();
	const [errMsg, setErrMsg] = useState("");
	const errRef = useRef<HTMLDivElement>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const userData = await login({ username, password }).unwrap();
			dispatch(setCredentials({ ...userData, username }));
			setUsername("");
			setPassword("");
			navigate("/welcome");
		} catch (err: any) {
			if (!err?.originalStatus) {
				// isLoading: true until timeout occurs
				setErrMsg("No Server Response");
			} else if (err.originalStatus === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.originalStatus === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
			errRef.current?.focus();
		}
	}

	return (
		<>
			<Box position="absolute" top="0" right="0" m="1rem">
				<SwitchThemeButton />
			</Box>
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
						id="username"
						label="Username"
						name="username"
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
		</>
	);
}
