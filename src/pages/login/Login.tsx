import { useEffect } from "react";
import { Avatar, Button, TextField, Box, Typography } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SwitchThemeButton from "../../components/navbar/SwitchThemeButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectErrorMessages,
	selectIsLoggedIn,
	userLogin,
} from "../../state/authSlice";
import "./login.css";
import { AppDispatch } from "state/store";

export default function Login() {
	document.title = "Login";
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState<string>("");
	const dispatch = useDispatch<AppDispatch>();
	let isLoggedIn = useSelector(selectIsLoggedIn);
	const error = useSelector(selectErrorMessages);
	const [logged, setLogged] = useState(isLoggedIn);

	useEffect(() => {
		if (isLoggedIn) {
			setLogged(true);
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (error) {
			setErrMsg(error);
		}
	}, [error]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!email || !password) {
			setErrMsg("Please fill all the fields");
		} else {
			const loginDetails = { email, password };
			dispatch(userLogin(loginDetails));
			if (!logged) {
				setErrMsg(error || "");
			}
		}
	}

	if (logged) {
		navigate("/dashboard", { replace: true });
	}

	return (
		<>
			<Box className="theme-button">
				<SwitchThemeButton />
			</Box>
			<Box className="wrapper-login">
				<Avatar className="avatar" sx={{ bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Log in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					className="login-form"
					noValidate>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoFocus
						value={email}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
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
						className="submit">
						Log In
					</Button>
				</Box>
				<Typography
					color={"red"}
					style={{
						marginTop: "10px",
						textAlign: "center",
					}}>
					{errMsg}
				</Typography>
			</Box>
		</>
	);
}
