import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectIsLoggedIn } from "../state/authSlice";

export default function RequireAuth() {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	console.log(isLoggedIn);
	const location = useLocation();
	if (isLoggedIn) {
		return <Outlet />;
	} else {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
}
