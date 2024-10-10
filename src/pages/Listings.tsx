import { GridColDef } from "@mui/x-data-grid"
import { useRef, useState } from "react"
import { FaPlus, FaRegEye } from "react-icons/fa6"
import { Link, useLocation } from "react-router-dom"
import { useClickAway } from "react-use"
import DashboardSearchBar from "../components/DashboardSearchBar"
import { CiSearch } from "react-icons/ci"
import MuiTableComponent from "../components/TableComponent"
import { BsThreeDots } from "react-icons/bs"
import { Popper } from "@mui/material"
import { BiEditAlt } from "react-icons/bi"
import { GoTrash } from "react-icons/go"

const rows = (): any[] => {
    const loopArray = [1, 2, 3]
    const returnArray: any[] = []
    loopArray.forEach((num) => {
        returnArray.push({
            id: num,
            name: "Rosemary Sunday",
            item: "Toyota Camry, Hyanda, Lexus, Lamborghini",
            quantity: 23,
            status: "Active",
        })
    })
    return returnArray
}

export default function Listings() {
    const location = useLocation()
    const { pathname } = location
    const [listingModal, setlistingModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const listingModalRef = useRef(null)
    const dotsPopupRef = useRef(null)

    useClickAway(listingModalRef, () => {
        setlistingModal(false)
    })

    useClickAway(dotsPopupRef, () => {
        setAnchorEl(null)
    })

    function openlistingModal() {
        setlistingModal(true)
    }

    function closelistingModal() {
        setlistingModal(false)
    }

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }

    const open = Boolean(anchorEl)
    const id = open ? "simple-popper" : undefined

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, sortable: false },
        { field: "item", headerName: "Item", flex: 1, sortable: false },
        { field: "quantity", headerName: "Qty", flex: 1 },
        { field: "status", headerName: "Status", sortable: false, flex: 1 },
        {
            field: "Action",
            renderCell: () => {
                return (
                    <div className="h-full w-full relative flex justify-center items-center overflow-visible">
                        <BsThreeDots
                            aria-describedby={id}
                            type="button"
                            onClick={handleClick}
                            size={16}
                            className="cursor-pointer"
                        />
                        <Popper
                            ref={dotsPopupRef}
                            className="p-3 text-sm flex flex-col gap-y-4 rounded-lg border border-primaryBorder bg-white"
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                        >
                            <div className="flex gap-x-7 items-center">
                                <Link to={`/listings/listing`}>
                                    <FaRegEye size={22} />
                                </Link>

                                <BiEditAlt size={22} />
                                <GoTrash size={22} />
                            </div>
                            <button className="w-full p-2 rounded-lg bg-[red] text-white hover:underline">
                                Unpublish
                            </button>
                        </Popper>
                    </div>
                )
            },
            flex: 0.5,
            sortable: false,
            headerName: "",
        },
    ]

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
            {listingModal ? (
                <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
                    <div
                        ref={listingModalRef}
                        className="w-[35%] rounded-[24px] flex flex-col p-8 bg-white"
                    >
                        <h2 className="text-2xl font-bold">Create Listing</h2>
                        <p className="mt-2 text-sm">
                            Lists allow you to group similar products together,
                            making it easier for customers to navigate and find
                            what they are looking for on your site.
                        </p>
                        <div className="flex flex-col mt-5 gap-y-1.5">
                            <label className="text-sm">Name:</label>
                            <input
                                type="text"
                                className="p-3 rounded-lg border border-primaryBorder outline-none"
                            />
                        </div>
                        <div className="flex flex-col mt-5 gap-y-1.5">
                            <label className="text-sm">Parent category:</label>
                            <input
                                type="text"
                                className="p-3 rounded-lg border border-primaryBorder outline-none"
                            />
                        </div>
                        <div className="flex flex-col mt-5 gap-y-1.5">
                            <label className="text-sm">Tags:</label>
                            <input
                                type="text"
                                className="p-3 rounded-lg border border-primaryBorder outline-none"
                            />
                        </div>
                        <div className="flex items-center mt-5 gap-x-3">
                            <input
                                type="checkbox"
                                id="set-active"
                                className="size-[15px] border border-primaryBorder outline-none"
                            />
                            <label htmlFor="set-active" className="text-sm">
                                Set category as active
                            </label>
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
                            <button
                                onClick={closelistingModal}
                                className="rounded-lg hover:underline"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-3 rounded-lg text-white bg-defaultOrange">
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col flex-1">
                <div className="flex justify-between items-center mt-1">
                    <h1 className="text-3xl font-bold flex items-start">
                        Listings{" "}
                        <span className="text-xs text-defaultOrange">
                            {rows().length}
                        </span>
                    </h1>

                    <button
                        onClick={openlistingModal}
                        className="rounded-lg flex items-center gap-x-2 px-5 py-2.5 text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        <FaPlus size={16} /> New listing
                    </button>
                </div>

                <div className="flex justify-between items-end mt-5 w-full">
                    <div className="flex gap-x-5 items-center">
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Status:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>Active</option>
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
