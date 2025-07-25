import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function LoggedInAuthenticator() {
  const location = useLocation();
  const { pathname } = location;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // if (!isAuthenticated && location.pathname !== "/admin/login") {
  //   return <Navigate to="/admin/login" replace />;
  // }

  return (
    <div className="flex h-screen w-screen">
      {pathname !== "/admin/login" ? <AdminSidebar /> : null}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
