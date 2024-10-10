import { NavLink } from "react-router-dom"
import logo from "../assets/logo.svg"
import { RxDashboard } from "react-icons/rx"
import { MdOutlineLogout } from "react-icons/md"
import { BsBoxSeam, BsCart3 } from "react-icons/bs"
import { LuUsers2 } from "react-icons/lu"
import { SlChart } from "react-icons/sl"
import { PiScroll, PiSealPercent } from "react-icons/pi"
import { TiFolderOpen } from "react-icons/ti"
// import { useState } from "react"
import { TbTie } from "react-icons/tb"
import { RiAuctionLine } from "react-icons/ri"

export default function AdminSidebar() {
    // const [productsDropdown, setProductsDropdown] = useState(false)

    return (
        <div className="h-full basis-[15.5%] flex flex-col px-4 py-5 gap-y-3 border-r border-r-[#E6E6E6] bg-[#F5F5F5]">
            <img className="h-[45px] w-fit" src={logo} alt="logo" />

            <div className="flex flex-col gap-y-2 flex-1 w-full mt-7">
                <NavLink
                    to=""
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <RxDashboard
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Dashboard</span>
                </NavLink>

                <NavLink
                    to="products"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <BsBoxSeam
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Products</span>
                </NavLink>

                <NavLink
                    to="customers"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <LuUsers2
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Customers</span>
                </NavLink>

                <NavLink
                    to="listings"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <PiScroll
                        size={18}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Listings</span>
                </NavLink>

                <NavLink
                    to="auctions"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <RiAuctionLine
                        size={18}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Auctions</span>
                </NavLink>

                <NavLink
                    to="orders"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <BsCart3
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Orders</span>
                </NavLink>

                <NavLink
                    to="reports"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <SlChart
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Reports</span>
                </NavLink>

                <NavLink
                    to="promotions"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <PiSealPercent
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Promotions & Discounts</span>
                </NavLink>

                <NavLink
                    to="shipments"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <BsBoxSeam
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Shipments</span>
                </NavLink>

                <NavLink
                    to="agents"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <TbTie
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Field Agents</span>
                </NavLink>

                <NavLink
                    to="documents"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <TiFolderOpen
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Documents</span>
                </NavLink>

                {/* <NavLink
                    to="settings"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "bg-white text-defaultOrange"
                                : "text-black hover:bg-white"
                        } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                    }
                >
                    <GoGear
                        size={16}
                        className="transition-none flex-shrink-0"
                    />
                    <span className="line-clamp-1">Settings</span>
                </NavLink> */}
            </div>

            <NavLink
                to="/login"
                className="w-full flex items-center gap-x-3 p-3 rounded-lg hover:bg-black/5"
            >
                <MdOutlineLogout size={16} color="crimson" />
                <span>Logout</span>
            </NavLink>
        </div>
    )
}
