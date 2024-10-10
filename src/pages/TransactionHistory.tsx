import { Link, useLocation } from "react-router-dom"
import DashboardSearchBar from "../components/DashboardSearchBar"
import { FaChevronRight } from "react-icons/fa6"
import { FaDotCircle, FaHandHoldingUsd } from "react-icons/fa"
import { CiSearch } from "react-icons/ci"
import MuiTableComponent from "../components/TableComponent"
import { generateRandomNumber } from "../helper/helperFunctions"
import { GridColDef } from "@mui/x-data-grid"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"
import { BsThreeDots } from "react-icons/bs"

const rows = (): any[] => {
    const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const returnArray: any[] = []
    loopArray.forEach((num) => {
        const statusPicker = generateRandomNumber(3, 1)
        returnArray.push({
            id: "100" + num,
            date: new Date(),
            itemName: "House 4-bedroom in Abuja",
            amount: generateRandomNumber(5000000, 100000),
            status:
                statusPicker === 1
                    ? "Cancelled"
                    : statusPicker === 2
                    ? "Completed"
                    : statusPicker === 3
                    ? "Pending"
                    : "",
        })
    })
    return returnArray
}

const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", flex: 0.7, sortable: false },
    { field: "date", headerName: "Order Date", type: "date", flex: 0.7 },
    {
        field: "itemName",
        headerName: "Items Purchased",
        flex: 1,
        sortable: false,
    },
    { field: "amount", headerName: "Total amount(₦)", type: "number", flex: 1 },
    {
        field: "status",
        headerName: "Status",
        renderCell: ({ row }) => {
            return (
                <div className="w-full h-full items-center flex justify-center">
                    <span
                        className={`${renderStatusColor(row.status)} text-sm`}
                    >
                        {row.status}
                    </span>
                </div>
            )
        },
        flex: 0.6,
    },
    {
        field: "Action",
        flex: 0.4,
        renderCell: () => {
            return (
                <div className="h-full relative flex justify-center items-center">
                    <FaHandHoldingUsd size={20} className="cursor-pointer" />
                </div>
            )
        },
    },
]

const rows2 = (): any[] => {
    const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const returnArray: any[] = []
    loopArray.forEach((num) => {
        const statusPicker = generateRandomNumber(2, 1)
        returnArray.push({
            id: "100" + num,
            date: new Date(),
            type: "Email",
            description: "Inquiry about land title",
            status:
                statusPicker === 1
                    ? "Resolved"
                    : statusPicker === 2
                    ? "Pending"
                    : "",
        })
    })
    return returnArray
}

const columns2: GridColDef[] = [
    { field: "date", headerName: "Date", type: "date", flex: 0.7 },
    {
        field: "type",
        headerName: "Type",
        flex: 1,
        sortable: false,
    },
    {
        field: "description",
        headerName: "Issue description",
        flex: 1,
        sortable: false,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        sortable: false,
    },
    {
        field: "Action",
        flex: 0.4,
        renderCell: ({ row }) => {
            return (
                <div className="h-full relative flex justify-center items-center">
                    <span className="text-xs text-defaultOrange/70 hover:underline cursor-pointer">
                        {row.status === "Resolved" ? "View details" : "Respond"}
                    </span>
                </div>
            )
        },
    },
]

function renderStatusColor(status: string) {
    if (status.toLowerCase() === "cancelled") return "text-[red]"
    else if (status.toLowerCase() === "completed") return "text-[#008000]"
    else if (status.toLowerCase() === "pending") return "text-[#C38D00]"
}

export default function TransactionHistory() {
    const location = useLocation()
    const { pathname } = location
    const [menuDropdown, setMenuDropdown] = useState(false)
    const menuDropdownRef = useRef<HTMLDivElement>(null)

    useClickAway(menuDropdownRef, () => {
        setMenuDropdown(false)
    })

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
                    <span className="text-sm">Transaction history</span>
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
                                    to={`/customers/customer/notifications`}
                                    className="text-sm px-4 py-3 whitespace-nowrap hover:underline"
                                >
                                    Notifications
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

                <div className="flex justify-between items-end mt-5 w-full">
                    <div className="flex gap-x-5 items-center">
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Category:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>Car</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Date:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>
                                    {new Date().toLocaleDateString()}
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Price:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>Over ₦1,000,000</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-x-2 px-3 basis-[25%] rounded-lg border border-primaryBorder">
                        <CiSearch className="h-fit w-fit my-auto" size={24} />
                        <input
                            className="flex-1 py-2.5 outline-none border-none text-sm bg-transparent"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                </div>
                {/* search */}

                <div className="mt-3 flex flex-col h-[30rem] w-full overflow-hidden bg-white">
                    <h2 className="font-semibold p-3">Order History</h2>
                    <MuiTableComponent
                        columns={columns}
                        showCheckbox={false}
                        rows={rows()}
                        paginationActive={true}
                        rowHeight={50}
                        pageSize={10}
                    />
                </div>

                <div className="flex justify-between items-end mt-5 w-full">
                    <div className="flex gap-x-5 items-center">
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Date:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>
                                    {new Date().toLocaleDateString()}
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Type:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>Email</option>
                                <option>Phone</option>
                                <option>Chat</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Status:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>--</option>
                                <option>Resolved</option>
                                <option>Pending</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-x-2 px-3 basis-[25%] rounded-lg border border-primaryBorder">
                        <CiSearch className="h-fit w-fit my-auto" size={24} />
                        <input
                            className="flex-1 py-2.5 outline-none border-none text-sm bg-transparent"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                </div>
                {/* search */}

                <div className="mt-3 flex flex-col h-[25rem] w-full overflow-hidden bg-white">
                    <h2 className="font-semibold p-3">Interaction History</h2>
                    <MuiTableComponent
                        columns={columns2}
                        showCheckbox={false}
                        rows={rows2()}
                        paginationActive={true}
                        rowHeight={45}
                        pageSize={10}
                    />
                </div>
            </div>
        </div>
    )
}
