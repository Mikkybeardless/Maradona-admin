import { Link, useLocation } from "react-router-dom"
import DashboardSearchBar from "../components/DashboardSearchBar"
import { FaChevronRight, FaRegEye } from "react-icons/fa6"
import { HiSortDescending } from "react-icons/hi"
import { CiSearch } from "react-icons/ci"
import MuiTableComponent from "../components/TableComponent"
import Car from "../assets/Dashboard-Car-3.png"
import { GridColDef } from "@mui/x-data-grid"
import { BsThreeDotsVertical } from "react-icons/bs"
import { generateRandomNumber } from "../helper/helperFunctions"
import { useRef, useState } from "react"
import { Popper } from "@mui/material"
import { BiEditAlt } from "react-icons/bi"
import { GoTrash } from "react-icons/go"
import { useClickAway } from "react-use"

type ProdcutTableType = {
    id: any
    img: string
    productName: string
    category: string
    price: number
    stock: number
    status: string
}

const rows = (): ProdcutTableType[] => {
    const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const returnArray: ProdcutTableType[] = []
    loopArray.forEach((num) => {
        const statusPicker = generateRandomNumber(3, 1)
        returnArray.push({
            id: num,
            img: Car,
            productName: "Toyota Camry LE (2024)",
            category: "Car",
            price: generateRandomNumber(5000000, 100000),
            stock: generateRandomNumber(10, 0),
            status:
                statusPicker === 1
                    ? "Published"
                    : statusPicker === 2
                    ? "Archived"
                    : statusPicker === 3
                    ? "Draft"
                    : "",
        })
    })
    return returnArray
}

function renderStatusColor(status: string) {
    if (status.toLowerCase() === "published")
        return "bg-[#E8F8E8] text-[#0C560B]"
    else if (status.toLowerCase() === "archived")
        return "bg-[#FEF3B8] text-[#D7B813]"
    else if (status.toLowerCase() === "draft")
        return "bg-[#DAE9FB] text-[#0B283E]"
}

export default function Products() {
    const location = useLocation()
    const { pathname } = location
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const dotsPopupRef = useRef(null)

    const open = Boolean(anchorEl)
    const id = open ? "simple-popper" : undefined

    useClickAway(dotsPopupRef, () => {
        setAnchorEl(null)
    })

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.1 },
        {
            field: "name",
            headerName: "Product",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            renderCell: ({ row }) => {
                return (
                    <div className="flex flex-1 h-full items-center gap-x-2">
                        <img
                            className="w-auto h-[70%] rounded-lg object-contain bg-gray-100"
                            src={row.img}
                            alt="Product"
                        />
                        <span className="text-sm">{row.productName}</span>
                    </div>
                )
            },
            flex: 4,
        },
        { field: "category", headerName: "Category" },
        { field: "price", headerName: "Price(₦)", type: "number" },
        { field: "stock", headerName: "Stock", type: "number", flex: 1 },
        {
            field: "status",
            headerName: "Status",
            renderCell: ({ row }) => {
                return (
                    <div className="w-full h-full items-center flex justify-center">
                        <span
                            className={`${renderStatusColor(
                                row.status
                            )} rounded-[100px] !text-xs px-2.5 py-1`}
                        >
                            {row.status}
                        </span>
                    </div>
                )
            },
            flex: 1,
        },
        {
            field: "Action",
            flex: 0.5,
            renderCell: () => {
                return (
                    <div className="h-full w-full relative z-10 flex justify-center items-center overflow-visible">
                        <BsThreeDotsVertical
                            aria-describedby={id}
                            type="button"
                            onClick={handleClick}
                            size={16}
                            className="cursor-pointer"
                        />
                        <Popper
                            ref={dotsPopupRef}
                            className="p-3 text-sm z-10 flex gap-x-4 items-center rounded-lg border border-primaryBorder bg-white"
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                        >
                            <Link to={`/products/product`}>
                                <FaRegEye size={18} />
                            </Link>

                            <BiEditAlt size={18} />
                            <GoTrash size={18} />
                        </Popper>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
            <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col flex-1">
                <div className="flex gap-x-4 items-center">
                    <Link to={`/`} className="text-sm opacity-60">
                        Dashboard
                    </Link>
                    <FaChevronRight size={18} />
                    <span className="text-sm">Products</span>
                </div>

                <div className="flex justify-between items-center mt-1">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Link
                        to={`/products/add-product`}
                        className="rounded-lg px-10 py-4 text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        Add product
                    </Link>
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
                            <p className="text-xs">Stock:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>2</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Sort by name:</p>
                            <div className="px-2.5 relative flex items-center gap-x-1 rounded-lg border border-primaryBorder bg-white">
                                <HiSortDescending />
                                <select
                                    id="selectSort"
                                    className="text-sm outline-none h-full py-2.5"
                                >
                                    <option>Sort by name</option>
                                </select>
                            </div>
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

                <div className="mt-3 flex flex-1 w-full overflow-hidden bg-white">
                    <MuiTableComponent
                        columns={columns}
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
