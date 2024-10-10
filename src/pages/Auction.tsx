import { FaPlus, FaRegEye, FaStar } from "react-icons/fa6"
import DashboardSearchBar from "../components/DashboardSearchBar"
import { CiSearch } from "react-icons/ci"
import MuiTableComponent from "../components/TableComponent"
import { GridColDef } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { BiEditAlt } from "react-icons/bi"
import { GoTrash } from "react-icons/go"

const rows = (): any[] => {
    const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const returnArray: any[] = []
    loopArray.forEach((num) => {
        returnArray.push({
            id: "DSA" + num,
            name: "Toyota Camry 2018",
            category: "Car",
            start: new Date(),
            end: new Date(),
            status: "Active",
        })
    })
    return returnArray
}

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "Auction ID",
        flex: 0.4,
        sortable: false,
    },
    {
        field: "name",
        headerName: "Item Name",
        flex: 1,
        sortable: false,
    },
    {
        field: "category",
        headerName: "Category",
        flex: 0.6,
        sortable: false,
    },
    {
        field: "start",
        headerName: "Start Date",
        flex: 0.6,
        type: "date",
    },
    {
        field: "end",
        headerName: "End Date",
        flex: 0.6,
        type: "date",
    },
    {
        field: "Action",
        flex: 0.8,
        sortable: false,
        headerName: "",
        renderCell: () => {
            return (
                <div className="h-full w-full flex justify-center gap-x-5 items-center">
                    <Link to="/auctions/auction">
                        <FaRegEye size={20} />
                    </Link>
                    <Link to="/auctions/add-auction">
                        <BiEditAlt size={20} />
                    </Link>
                    <GoTrash className="flex-shrink-0" size={20} />
                </div>
            )
        },
    },
]

export default function Auction() {
    return (
        <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
            <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col flex-1">
                <div className="flex justify-between items-center mt-1">
                    <h1 className="text-3xl font-bold flex items-start">
                        Auction
                    </h1>

                    <Link
                        to="/auctions/add-auction"
                        className="rounded-lg flex items-center gap-x-2 px-5 py-2.5 text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        <FaPlus size={18} />
                        New Auction
                    </Link>
                </div>

                <div className="w-full h-[7rem] grid grid-cols-3 gap-x-10 mt-8">
                    <div className="w-full h-full p-3 flex flex-col justify-center items-center gap-y-5 text-sm rounded-2xl border border-primaryBorder">
                        <p className="font-medium">Total Active Auctions</p>
                        <p className="">15</p>
                    </div>
                    <div className="w-full h-full p-3 flex flex-col justify-center items-center gap-y-5 text-sm rounded-2xl border border-primaryBorder">
                        <p className="font-medium">Total Bids Received</p>
                        <p className="">2 days</p>
                    </div>
                    <div className="w-full h-full p-3 flex flex-col justify-center items-center gap-y-5 text-sm rounded-2xl border border-primaryBorder">
                        <p className="font-medium">Highest Bidding Auction</p>
                        <p className="flex items-center gap-x-2">
                            4.8/5
                            <FaStar color="#F0CA00" />
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-end mt-5 w-full">
                    <div className="flex gap-x-5 items-center">
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Status:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Start Date:</p>
                            <input
                                type="date"
                                className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">End Date:</p>
                            <input
                                type="date"
                                className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none"
                            />
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

                <div className="mt-3 flex h-[25rem] w-full overflow-hidden bg-white">
                    <MuiTableComponent
                        columns={columns}
                        showCheckbox={false}
                        rows={rows()}
                        paginationActive={true}
                        rowHeight={60}
                        pageSize={10}
                    />
                </div>
            </div>
        </div>
    )
}
