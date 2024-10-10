import { GridColDef } from "@mui/x-data-grid"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"
import DashboardSearchBar from "../components/DashboardSearchBar"
import { CiSearch } from "react-icons/ci"
import MuiTableComponent from "../components/TableComponent"
import { FaPlus, FaRegEye } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { GoTrash } from "react-icons/go"
import { TbAward } from "react-icons/tb"
import { generateRandomNumber } from "../helper/helperFunctions"
import { IoCloudUploadOutline } from "react-icons/io5"

const rows = (): any[] => {
    const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const returnArray: any[] = []
    loopArray.forEach((num) => {
        returnArray.push({
            id: "DSFA" + num,
            name: "Rosemary Sunday",
            email: "rosemarys@gmail.com",
            phone: "07071234323",
            status: "Active",
            verifiedListings: 10,
        })
    })
    return returnArray
}

const rows2 = (): any[] => {
    const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const returnArray: any[] = []
    loopArray.forEach((num) => {
        returnArray.push({
            id: num,
            product: "Toyota Camry LE",
            category: "Car",
            price: `₦${generateRandomNumber(5000000, 1000000)}`,
            stock: 2,
        })
    })
    return returnArray
}

export default function FieldAgents() {
    const [newAgentModal, setNewAgentModal] = useState(false)
    const [agentType, setAgentType] = useState("agent")
    const newAgentModalRef = useRef(null)

    useClickAway(newAgentModalRef, () => {
        setNewAgentModal(false)
    })

    function openNewAgentModal() {
        setNewAgentModal(true)
    }

    function closeNewAgentModal() {
        setNewAgentModal(false)
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "Agent ID", flex: 0.4, sortable: false },
        {
            field: "name",
            headerName: "Customer name",
            flex: 1,
            sortable: false,
        },
        { field: "email", headerName: "Email", flex: 1, sortable: false },
        { field: "phone", headerName: "Phone", flex: 1, sortable: false },
        { field: "status", headerName: "Status", flex: 0.5, sortable: false },
        {
            field: "verifiedListings",
            headerName: "Verified Listings",
            flex: 0.3,
            sortable: false,
            renderCell: () => {
                return (
                    <div className="h-full w-full relative flex justify-center items-center gap-x-0.5">
                        <TbAward size={18} className="flex-shrink-0" />
                        <span className="text-xs text-defaultOrange">10</span>
                    </div>
                )
            },
        },
        {
            field: "Action",
            headerName: "",
            renderCell: () => {
                return (
                    <div className="h-full w-full relative flex justify-center items-center gap-x-5">
                        <Link to="/agents/agent">
                            <FaRegEye size={20} />
                        </Link>
                        <GoTrash className="flex-shrink-0" size={20} />
                    </div>
                )
            },
            flex: 0.5,
            sortable: false,
        },
    ]

    const columns2: GridColDef[] = [
        {
            field: "product",
            headerName: "Product",
            flex: 1,
            sortable: false,
        },
        { field: "category", headerName: "Category", flex: 1, sortable: false },
        { field: "price", headerName: "Price(₦)", flex: 1 },
        { field: "stock", headerName: "Stock", flex: 0.4, type: "number" },
        {
            field: "Action",
            headerName: "",
            renderCell: () => {
                return (
                    <div className="h-full w-full relative flex justify-center items-center gap-x-4">
                        <Link
                            to="/agents/request"
                            state={{ fieldAgent: true }}
                            className="text-sm text-[#C38D00] hover:underline"
                        >
                            View
                        </Link>
                        <span className="text-sm text-red-500">Reject</span>
                    </div>
                )
            },
            flex: 0.7,
            sortable: false,
        },
    ]
    return (
        <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
            {newAgentModal ? (
                <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
                    <div
                        ref={newAgentModalRef}
                        className="w-[50%] h-[90%] rounded-[24px] flex flex-col p-8 bg-white"
                    >
                        <h2 className="text-2xl font-bold">Add New Agent</h2>
                        <div className="w-full flex flex-col flex-1 gap-y-3.5 mt-2 overflow-y-auto custom-scrollbar-low-opacity">
                            <div className="flex flex-col gap-y-2 text-sm">
                                <label className="">Full Name:</label>
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                                    placeholder="Type"
                                />
                            </div>
                            <div className="flex flex-col gap-y-2 text-sm">
                                <label className="">Email:</label>
                                <input
                                    type="email"
                                    className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                                    placeholder="Type"
                                />
                            </div>
                            <div className="flex flex-col gap-y-2 text-sm">
                                <label className="">Passowrd:</label>
                                <input
                                    type="password"
                                    className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                                    placeholder="Type"
                                />
                            </div>
                            <div className="flex flex-col gap-y-2 text-sm">
                                <label className="">Confirm Password:</label>
                                <input
                                    type="password"
                                    className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                                    placeholder="Type"
                                />
                            </div>
                            <div className="flex flex-col gap-y-2 text-sm">
                                <label className="">Phone Number:</label>
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                                    placeholder="Type"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h6 className="text-sm">
                                    Identification Upload:
                                </h6>
                                <div className="w-full grid grid-cols-2 gap-x-4 mt-2">
                                    <div className="w-full flex flex-col gap-y-2">
                                        <p className="text-sm text-[#A3A3B3]">
                                            Upload Front
                                        </p>
                                        <button className="w-full py-3.5 flex justify-center items-center gap-x-3 rounded-lg bg-[#F4F1F3] border border-primaryBorder border-dashed">
                                            <IoCloudUploadOutline
                                                size={24}
                                                color="#e65800"
                                            />
                                            <span className="text-sm">
                                                Upload File
                                            </span>
                                        </button>
                                    </div>
                                    <div className="w-full flex flex-col gap-y-2">
                                        <p className="text-sm text-[#A3A3B3]">
                                            Upload Back
                                        </p>
                                        <button className="w-full py-3.5 flex justify-center items-center gap-x-3 rounded-lg bg-[#F4F1F3] border border-primaryBorder border-dashed">
                                            <IoCloudUploadOutline
                                                size={24}
                                                color="#e65800"
                                            />
                                            <span className="text-sm">
                                                Upload File
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
                            <button
                                onClick={closeNewAgentModal}
                                className="rounded-lg hover:underline"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-3 rounded-lg text-white bg-defaultOrange">
                                Add Agent
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
                        Field Agents
                    </h1>

                    <button
                        onClick={openNewAgentModal}
                        className="rounded-lg flex items-center gap-x-2 px-5 py-2.5 text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        <FaPlus size={18} />
                        New Field Agent
                    </button>
                </div>

                <div className="w-full flex gap-x-6 items-center mt-3 text-sm border-b border-b-primaryBorder">
                    <button
                        className={`${
                            agentType === "agent"
                                ? "border-b-[3px] border-b-defaultOrange"
                                : "text-[#585858]"
                        } py-3`}
                        onClick={() =>
                            agentType !== "agent" ? setAgentType("agent") : null
                        }
                    >
                        Agents{" "}
                        <span className="text-xs text-defaultOrange">10</span>
                    </button>
                    <button
                        className={`${
                            agentType === "request"
                                ? "border-b-[3px] border-b-defaultOrange"
                                : "text-[#585858]"
                        } py-3`}
                        onClick={() =>
                            agentType !== "request"
                                ? setAgentType("request")
                                : null
                        }
                    >
                        Requests{" "}
                        <span className="text-xs text-defaultOrange">23</span>
                    </button>
                </div>

                <div className="flex justify-between items-end mt-3 w-full">
                    <div className="flex gap-x-5 items-center">
                        <div className="flex flex-col gap-y-1">
                            <p className="text-xs">Status:</p>
                            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                                <option>Active</option>
                                <option>Inactive</option>
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
                    {agentType === "agent" ? (
                        <MuiTableComponent
                            showCheckbox={false}
                            columns={columns}
                            rows={rows()}
                            paginationActive={true}
                            rowHeight={60}
                            pageSize={10}
                        />
                    ) : (
                        <MuiTableComponent
                            columns={columns2}
                            rows={rows2()}
                            paginationActive={true}
                            rowHeight={60}
                            pageSize={10}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
