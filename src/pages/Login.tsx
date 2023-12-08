import * as React from "react";
import {Avatar, Button, TextField, Box, Typography} from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SwitchThemeButton from "../components/SwitchThemeButton";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {login} from "../api/authApi";
import {useDispatch} from "react-redux";
import {userLoaded} from "../state/authSlice";
import "./login.css";

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
                dispatch(userLoaded(res.data));
                navigate("/dashboard");
            })
            .catch((err) => {
                if (!err.response) {
                    setErrMsg("Something went wrong");
                    return;
                } else {
                    switch (err.response.status) {
                        case 400:
                            setErrMsg("Invalid email or password");
                            break;
                        case 401:
                            setErrMsg("Invalid email or password");
                            break;
                        case 500:
                            setErrMsg("Server error you might want to try again later");
                            break;
                        case 503:
                            setErrMsg("Server Down");
                            break;
                        default:
                            setErrMsg("Something went wrong");
                            break;
                    }
                }
            });
    }

    return (
        <>
            <Box className="theme-button">
                <SwitchThemeButton/>
            </Box>
            <Box className="wrapper-login">
                <Avatar className="avatar" sx={{bgcolor: "secondary.main"}}>
                    <LockOutlinedIcon/>
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
                <Typography color={"red"}>{errMsg}</Typography>
            </Box>
        </>
    );
}
