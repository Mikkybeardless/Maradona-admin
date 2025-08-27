import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function LoggedInAuthenticator() {
  const location = useLocation();
  const { pathname } = location;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // const token = Cookies.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    console.log("isAuthenticated:", isAuthenticated);
    // console.log("token:", !!token);

    if (!token) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, pathname]);
  // If not authenticated and not on the login page, redirect to login
  // if (!isAuthenticated && !token && location.pathname !== "/admin/login") {
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
