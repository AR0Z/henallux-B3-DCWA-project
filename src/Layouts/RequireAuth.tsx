import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { RootState } from "state/store";

export default function RequireAuth() {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();
    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}
