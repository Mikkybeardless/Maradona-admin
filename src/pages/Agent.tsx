import {
    FaArrowLeftLong,
    FaCircle,
    FaRegFilePdf,
    FaStar,
} from "react-icons/fa6"
import DashboardSearchBar from "../components/DashboardSearchBar"
import Profile from "../assets/sign-in-image.png"
import { VscVerifiedFilled } from "react-icons/vsc"
import { PiPencilSimpleBold } from "react-icons/pi"
import MuiTableComponent from "../components/TableComponent"
import { GridColDef } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"
import { IoCloudUploadOutline } from "react-icons/io5"

const rows = (): any[] => {
    const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const returnArray: any[] = []
    loopArray.forEach((num) => {
        returnArray.push({
            id: "CS" + num,
            date: new Date(),
            type: "Car",
            status: "Completed",
            notes: "Condition matched description. Documents in order.",
        })
    })
    return returnArray
}

export default function Agent() {
    const [editAgentModal, setEditAgentModal] = useState(false)
    const editAgentModalRef = useRef(null)

    useClickAway(editAgentModalRef, () => {
        setEditAgentModal(false)
    })

    function openEditAgentModal() {
        setEditAgentModal(true)
    }

    function closeEditAgentModal() {
        setEditAgentModal(false)
    }

    const columns: GridColDef[] = [
        { field: "date", headerName: "Date", flex: 0.5, type: "date" },
        { field: "id", headerName: "Item ID", flex: 0.5, sortable: false },
        { field: "type", headerName: "Type", flex: 0.5, sortable: false },
        { field: "status", headerName: "Status", flex: 0.5, sortable: false },
        { field: "notes", headerName: "Notes", flex: 1, sortable: false },
    ]

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
            {editAgentModal ? (
                <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
                    <div
                        ref={editAgentModalRef}
                        className="w-[50%] h-[90%] rounded-[24px] flex flex-col p-8 bg-white"
                    >
                        <h2 className="text-2xl font-bold">Edit</h2>
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
                                onClick={closeEditAgentModal}
                                className="rounded-lg hover:underline"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-3 rounded-lg text-white bg-defaultOrange">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col flex-1">
                <Link
                    to="/agents"
                    className="flex gap-x-3 items-center text-sm hover:underline w-fit"
                >
                    <FaArrowLeftLong />
                    <span className="">Agents</span>
                </Link>

                <div className="w-full flex justify-between items-start mt-5">
                    <div className="flex gap-x-4 items-center">
                        <img
                            src={Profile}
                            alt="Profile"
                            className="size-[70px] rounded-full object-fill"
                        />
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-bold flex items-center gap-x-2">
                                Rosemary Sunday
                                <VscVerifiedFilled size={18} color="#4f46e5" />
                            </h1>
                            <p className="text-sm flex items-center gap-x-2">
                                Last login:
                                <span className="font-medium flex items-center gap-x-1">
                                    Jul 01, 2024
                                    <FaCircle size={5} />
                                    12:30pm
                                </span>
                            </p>
                            <div className="flex gap-x-2">
                                <span className="px-2 py-0.5 text-sm rounded-[100px] bg-[#FCDFD7] text-[#4A1E11]">
                                    Agent
                                </span>
                                <span className="px-2 py-0.5 text-sm rounded-[100px] bg-[#E8F7E8] text-[#008000]">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* profile */}
                    <button
                        onClick={openEditAgentModal}
                        className="flex items-center gap-x-3 rounded-lg px-5 py-2.5 text-sm border border-[#B5ABB3] text-[#5C4D58]"
                    >
                        <PiPencilSimpleBold size={18} />
                        Edit
                    </button>
                </div>

                <div className="w-full h-[7rem] grid grid-cols-3 gap-x-10 mt-8">
                    <div className="w-full h-full p-3 flex flex-col justify-center items-center gap-y-5 text-sm rounded-2xl border border-primaryBorder">
                        <p className="font-medium">
                            Total Verifications Completed
                        </p>
                        <p className="">15</p>
                    </div>
                    <div className="w-full h-full p-3 flex flex-col justify-center items-center gap-y-5 text-sm rounded-2xl border border-primaryBorder">
                        <p className="font-medium">Average Verification Time</p>
                        <p className="">2 days</p>
                    </div>
                    <div className="w-full h-full p-3 flex flex-col justify-center items-center gap-y-5 text-sm rounded-2xl border border-primaryBorder">
                        <p className="font-medium">
                            Verification Quality Rating
                        </p>
                        <p className="flex items-center gap-x-2">
                            4.8/5
                            <FaStar color="#F0CA00" />
                        </p>
                    </div>
                </div>

                <div className="w-full flex gap-x-4 items-start mt-10">
                    <div className="w-[60%] flex flex-col rounded-lg bg-white border border-primaryBorder">
                        <h4 className="py-3 px-6 rounded-t-lg font-semibold bg-[#F4F1F3] brder-b border-b-primaryBorder">
                            Basic Information
                        </h4>
                        <div className="px-6 pb-4 flex flex-col text-sm">
                            <div className="flex justify-between items-center gap-x-2 py-3 border-b border-b-primaryBorder">
                                <span className="font-medium">Agent ID:</span>
                                <span className="">#123</span>
                            </div>
                            <div className="flex justify-between items-center gap-x-2 py-3 border-b border-b-primaryBorder">
                                <span className="font-medium">Name:</span>
                                <span className="">Rosemary Sunday</span>
                            </div>
                            <div className="flex justify-between items-center gap-x-2 py-3 border-b border-b-primaryBorder">
                                <span className="font-medium">Email:</span>
                                <span className="">rosemarys@gmail.com</span>
                            </div>
                            <div className="flex justify-between items-center gap-x-2 py-3">
                                <span className="font-medium">Phone:</span>
                                <span className="">+234 464 782 2782</span>
                            </div>
                            <div className="flex flex-col gap-y-3 p-3 rounded-lg text-sm border border-primaryBorder bg-black/[2%]">
                                <p className="font-semibold">Notes</p>
                                <p className="">
                                    "Rosemary has been an exemplary field agent,
                                    consistently delivering thorough and
                                    accurate verifications. His attention to
                                    detail and prompt communication with both
                                    sellers and the admin team has significantly
                                    improved the quality of our listings. Keep
                                    up the excellent work, Rosemary."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[40%] flex flex-col rounded-lg bg-white border border-primaryBorder">
                        <h4 className="py-3 px-4 rounded-t-lg font-semibold bg-[#F4F1F3] brder-b border-b-primaryBorder">
                            Documents uploads
                        </h4>
                        <div className="px-6 flex flex-col text-sm">
                            <div className="flex flex-col py-4 gap-y-2 text-sm border-b border-b-primaryBorder">
                                <p className="text-[#5C4D58]">
                                    Means of identification
                                </p>
                                <div className="flex gap-x-2 items-center">
                                    <div className="flex gap-x-2 items-center w-full">
                                        <FaRegFilePdf size={22} />
                                        <div className="flex flex-col">
                                            <p className="">
                                                Natinoal ID card Front.pdf
                                            </p>
                                            <p className="text-xs">120 KB</p>
                                        </div>
                                    </div>
                                    <button className="text-defaultOrange hover:underline">
                                        View
                                    </button>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <div className="flex gap-x-2 items-center w-full">
                                        <FaRegFilePdf size={22} />
                                        <div className="flex flex-col">
                                            <p className="">
                                                Natinoal ID card Front.pdf
                                            </p>
                                            <p className="text-xs">120 KB</p>
                                        </div>
                                    </div>
                                    <button className="text-defaultOrange hover:underline">
                                        View
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col py-4 gap-y-2 text-sm">
                                <p className="text-[#5C4D58]">
                                    Driver's License
                                </p>
                                <div className="flex gap-x-2 items-center">
                                    <div className="flex gap-x-2 items-center w-full">
                                        <FaRegFilePdf size={22} />
                                        <div className="flex flex-col">
                                            <p className="">
                                                Natinoal ID card Front.pdf
                                            </p>
                                            <p className="text-xs">120 KB</p>
                                        </div>
                                    </div>
                                    <button className="text-defaultOrange hover:underline">
                                        View
                                    </button>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <div className="flex gap-x-2 items-center w-full">
                                        <FaRegFilePdf size={22} />
                                        <div className="flex flex-col">
                                            <p className="">
                                                Natinoal ID card Front.pdf
                                            </p>
                                            <p className="text-xs">120 KB</p>
                                        </div>
                                    </div>
                                    <button className="text-defaultOrange hover:underline">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-10">
                    <h5 className="font-medium">Verification History</h5>
                    <div className="w-full h-[70vh] flex mt-4">
                        <MuiTableComponent
                            showCheckbox={false}
                            columns={columns}
                            rows={rows()}
                            paginationActive={true}
                            rowHeight={60}
                            pageSize={10}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
