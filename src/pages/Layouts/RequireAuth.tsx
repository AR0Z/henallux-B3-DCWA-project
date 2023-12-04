import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RequireAuth = () => {
	const token = useSelector((state: any) => state.auth.token);
	const location = useLocation();
	let decodedToken;
	try {
		decodedToken = jwtDecode(token);
	} catch (err) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	const currentTime = new Date();
	return decodedToken.exp * 1000 >= currentTime.getTime() ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};
export default RequireAuth;
