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

  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, pathname]);

  return (
    <div className="flex h-screen w-screen">
      {pathname !== "/admin/login" ? <AdminSidebar /> : null}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
