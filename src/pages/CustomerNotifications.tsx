import { Link, useLocation } from "react-router-dom"
import DashboardSearchBar from "../components/DashboardSearchBar"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"
import { FaChevronRight } from "react-icons/fa6"
import { FaDotCircle } from "react-icons/fa"
import { BsGear, BsThreeDots } from "react-icons/bs"

export default function CustomerNotifications() {
    const location = useLocation()
    const { pathname } = location
    const [menuDropdown, setMenuDropdown] = useState(false)
    const menuDropdownRef = useRef<HTMLDivElement>(null)

    useClickAway(menuDropdownRef, () => {
        setMenuDropdown(false)
    })

    function Notification() {
        return (
            <div className="flex items-center px-4 py-3 border-t border-t-primaryBorder">
                <div className="flex items-center gap-x-5 w-full">
                    <input
                        className="size-[15px] cursor-pointer"
                        type="checkbox"
                        id=""
                    />
                    <div className="flex flex-col gap-y-1">
                        <p className="text-sm font-medium">
                            Rosemary placed a new order
                        </p>
                        <p className="text-xs">4 minutes ago</p>
                    </div>
                </div>
                <span className="px-3 py-1.5 rounded-[8px] text-xs cursor-pointer hover:underline text-[#008000] bg-[#D9FFD9]">
                    Settle
                </span>
            </div>
        )
    }

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
            <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col">
                <div className="flex gap-x-4 items-center">
                    <Link
                        to={`/customers/customer`}
                        className="text-sm opacity-60"
                    >
                        Customer
                    </Link>
                    <FaChevronRight size={18} />
                    <span className="text-sm">Notifications</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex flex-col gap-y-1.5">
                        <h1 className="text-3xl font-bold flex items-start">
                            Rosemary Sunday
                        </h1>
                        <div className="flex gap-x-2 text-[#5D5D5D] items-center">
                            <span className="text-sm">FCT, Abuja, Nigeria</span>
                            <FaDotCircle size={5} color="#D9D9D9" />
                            <span className="text-sm">2 days ago</span>
                        </div>
                    </div>
                    <div className="relative overflow-visible">
                        <BsThreeDots
                            onClick={() => setMenuDropdown(true)}
                            className="cursor-pointer"
                            size={30}
                        />
                        {menuDropdown ? (
                            <div
                                ref={menuDropdownRef}
                                className="absolute flex flex-col top-[110%] right-0 z-20 py-1 rounded-lg bg-white border border-primaryBorder"
                            >
                                <Link
                                    to={`/customers/customer/transaction-history`}
                                    className="text-sm px-4 py-3 whitespace-nowrap hover:underline"
                                >
                                    Transaction History
                                </Link>
                                <Link
                                    to={`/customers/customer/feedback`}
                                    className="text-sm px-4 py-3 whitespace-nowrap hover:underline"
                                >
                                    Feedback & Reviews
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="flex gap-x-5 items-center mt-5">
                    <div className="flex flex-col gap-y-1">
                        <p className="text-xs">Date:</p>
                        <input
                            type="datetime-local"
                            className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <p className="text-xs">Price:</p>
                        <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                            <option>Settled</option>
                            <option>Pending</option>
                        </select>
                    </div>
                </div>

                <div className="w-full mt-5 flex items-start gap-x-5">
                    <div className="w-[60%] rounded-t-lg">
                        <div className="flex justify-between px-4 py-2.5 rounded-t-lg bg-[#E6E6E6]">
                            <span className="text-sm font-semibold">
                                Notification
                            </span>
                            <BsGear size={20} className="cursor-pointer" />
                        </div>
                        <div className="w-full flex flex-col  bg-white">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <Notification key={num} />
                            ))}
                        </div>
                    </div>
                    <div className="w-[40%] rounded-t-lg">
                        <div className="flex justify-between px-4 py-2.5 rounded-t-lg bg-[#E6E6E6]">
                            <span className="text-sm font-semibold">
                                Messages
                            </span>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center h-56 bg-white">
                            No messages found
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
