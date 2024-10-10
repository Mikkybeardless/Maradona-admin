import { FaPlus } from "react-icons/fa6"
import DashboardSearchBar from "../components/DashboardSearchBar"
import { CiSearch } from "react-icons/ci"
import MuiTableComponent from "../components/TableComponent"
import { GridColDef } from "@mui/x-data-grid"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { IoCloudUploadOutline } from "react-icons/io5"

const documentsRow = (): any[] => {
    const loopArray = [1, 2, 3, 4, 5]
    const returnArray: any[] = []
    loopArray.forEach((num) => {
        returnArray.push({
            id: num,
            name: "image5.jpg",
            details: {
                processed: "$undefined",
                vendor: "sed",
                date: new Date().toLocaleDateString(),
                ref: "100" + num,
            },
            uploadedBy: "Rosemary Sunday",
            uploadedOn: new Date(),
        })
    })
    return returnArray
}

const documentsColumn: GridColDef[] = [
    { field: "name", headerName: "File Name", flex: 1, sortable: false },
    {
        field: "details",
        headerName: "Details",
        renderCell: ({ row }) => {
            return (
                <div className="flex flex-col h-full justify-center">
                    <p className="text-xs">
                        Processed: {row.details.processed}
                    </p>
                    <p className="text-xs">Vendor: {row.details.vendor}</p>
                    <p className="text-xs">Date: {row.details.date}</p>
                    <p className="text-xs">Ref: #{row.details.ref}</p>
                </div>
            )
        },
        flex: 1,
    },
    {
        field: "uploadedBy",
        headerName: "Uploaded By",
        flex: 1,
        sortable: false,
    },
    { field: "uploadedOn", headerName: "Uploaded On", flex: 0.5, type: "date" },
]

export default function Documents() {
    const [uploadModal, setUploadModal] = useState(false)
    const [uploadBusiness, setUploadBusiness] = useState(false)
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        // acceptedFiles,
        // fileRejections,
    } = useDropzone({
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
        maxSize: 20000000,
    })

    // const files = acceptedFiles.map((file, index) => {
    //     return (
    //         <img
    //             key={index}
    //             className="w-full h-[5rem] object-fill rounded-lg bg-gray-100"
    //             src={URL.createObjectURL(file)}
    //             alt="Car"
    //         />
    //     )
    // })

    function openUploadModal() {
        setUploadModal(true)
    }

    function closeUploadModal() {
        setUploadModal(false)
    }

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10">
            {uploadModal ? (
                <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
                    <div className="w-[50%] flex flex-col p-8 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-xl">File</h3>
                        </div>
                        <button className="flex gap-x-1.5 items-center ml-auto mt-2 w-fit text-sm text-[#898989] hover:underline">
                            <FaPlus size={14} /> Embed media
                        </button>
                        <div
                            {...getRootProps()}
                            className="w-full h-[10rem] mt-3 flex flex-col justify-center items-center gap-y-1 rounded-lg cursor-pointer border border-[#B0B0B0] border-dashed bg-[#F5F5F5]"
                        >
                            <input {...getInputProps()} />
                            {!isDragActive ? (
                                <>
                                    <IoCloudUploadOutline size={30} />
                                    <p className="text-lg font-semibold text-center">
                                        Drag files here or click to select
                                    </p>
                                    <p className="text-sm text-[#898989]">
                                        Png, jpeg, Mp4 supported up to 20mb max
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="">Drop file(s) here...</p>
                                </>
                            )}
                        </div>
                        {uploadBusiness ? (
                            <div className="w-full mt-2 flex flex-col gap-y-1.5">
                                <p className="text-sm font-semibold">
                                    Business registration certificate
                                </p>
                                <div
                                    onClick={() =>
                                        document
                                            .getElementById("registration")
                                            ?.click()
                                    }
                                    className="w-full flex justify-center items-center gap-x-2 py-3 rounded-lg border border-[#B0B0B0] border-dashed bg-[#F5F5F5]"
                                >
                                    <IoCloudUploadOutline
                                        size={25}
                                        color="#e65800"
                                    />
                                    <span className="text-sm">Upload file</span>
                                </div>
                                <input type="file" id="registration" hidden />
                            </div>
                        ) : null}

                        <div className="flex justify-end gap-x-3 text-sm mt-4">
                            <button
                                onClick={closeUploadModal}
                                className="py-3 px-5 rounded-lg border border-primaryBorder"
                            >
                                Cancel
                            </button>
                            <button className="py-3 px-5 rounded-lg text-white bg-defaultOrange">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="w-full py-3.5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col gap-y-5 flex-1">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-semibold">Documents</h1>
                    <button
                        onClick={openUploadModal}
                        className="rounded-lg text-sm flex items-center gap-x-3 p-3 px-4 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        <FaPlus size={18} />
                        Upload File
                    </button>
                </div>

                <div className="flex gap-x-2 px-3 w-[25%] ml-auto rounded-lg border border-primaryBorder">
                    <CiSearch className="h-fit w-fit my-auto" size={24} />
                    <input
                        className="w-full py-2.5 outline-none border-none text-sm bg-transparent"
                        placeholder="Search documents"
                        type="text"
                    />
                </div>

                <div className="w-full flex flex-1 mt-4">
                    <MuiTableComponent
                        columns={documentsColumn}
                        // showCheckbox={false}
                        rows={documentsRow()}
                        paginationActive={true}
                        rowHeight={80}
                        pageSize={10}
                    />
                </div>
            </div>
        </div>
    )
}
