import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function LoggedInAuthenticator() {
  const location = useLocation();
  const { pathname } = location;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen">
      {pathname.split("/")[1] !== "login" ? <AdminSidebar /> : null}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
