import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";

export default function RequireAuth() {
	const token = useSelector((state: any) => state.auth.token);
	const location = useLocation();
	let decodedToken: JwtPayload;
	try {
		decodedToken = jwtDecode(token);
	} catch (err) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	const currentTime = new Date();
	return (decodedToken.exp || 0) * 1000 >= currentTime.getTime() ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}
