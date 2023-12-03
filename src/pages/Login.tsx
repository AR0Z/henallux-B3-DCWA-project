import * as React from "react";
import { Avatar, Button, TextField, Box, Typography } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SwitchThemeButton from "../components/SwitchThemeButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/authApi";
import { useDispatch } from "react-redux";
import { userLoaded } from "../state/authSlice";

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const dispatch = useDispatch();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		await login(email, password)
			.then((res) => {
				dispatch(userLoaded(res.token));
				localStorage.setItem("token", res.token);
				if (res.refreshToken)
					localStorage.setItem("refreshToken", res.refreshToken);
				navigate("/");
			})
			.catch((err) => {
				switch (err.response.status) {
					case 400:
						setErrMsg("Invalid email or password");
						break;
					case 401:
						setErrMsg("Invalid email or password");
						break;
					default:
						setErrMsg("Something went wrong");
						break;
				}
			});
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
						id="email"
						label="Email"
						name="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)
						}
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
				<Typography color={"red"}>{errMsg}</Typography>
			</Box>
		</>
	);
}
