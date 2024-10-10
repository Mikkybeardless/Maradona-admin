import { Outlet, useLocation } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"

export default function LoggedInAuthenticator() {
    const location = useLocation()
    const { pathname } = location

    return (
        <div className="flex h-screen w-screen">
            {pathname.split("/")[1] !== "login" ? <AdminSidebar /> : null}
            <div className="flex-1 overflow-hidden">
                <Outlet />
            </div>
        </div>
    )
}
