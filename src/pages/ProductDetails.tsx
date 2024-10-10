import { Link, useLocation } from "react-router-dom"
import DashboardSearchBar from "../components/DashboardSearchBar"
import { FaChevronRight } from "react-icons/fa6"
import { CiEdit } from "react-icons/ci"
import { BsTrash3 } from "react-icons/bs"
import Car from "../assets/Product-page-car.png"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"

export default function ProductDetails() {
    const location = useLocation()
    const { pathname, state } = location
    const [assignAgentModal, setAssignAgentModal] = useState(false)
    const assignAgentModalRef = useRef(null)

    useClickAway(assignAgentModalRef, () => {
        setAssignAgentModal(false)
    })

    function openAssignAgentModal() {
        setAssignAgentModal(true)
    }

    function closeAssignAgentModal() {
        setAssignAgentModal(false)
    }

    return (
        <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar pb-10 bg-[#F5F5F5]">
            {assignAgentModal ? (
                <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
                    <div
                        ref={assignAgentModalRef}
                        className="w-[35%] h-[70%] rounded-[24px] flex flex-col p-8 bg-white"
                    >
                        <h2 className="text-2xl font-bold">Available Agents</h2>
                        <div className="w-full flex flex-col flex-1 gap-y-4 mt-4 overflow-y-auto custom-scrollbar-low-opacity">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <div
                                    key={num}
                                    className="flex items-center gap-x-3"
                                >
                                    <input
                                        className="size-[18px]"
                                        type="radio"
                                        name="agent"
                                        id={"agent" + num}
                                    />
                                    <img
                                        src={Car}
                                        alt="Profile"
                                        className="size-[40px] object-fill rounded-full bg-gray-300"
                                    />
                                    <label htmlFor={"agent" + num} className="">
                                        Rosemary Sunday
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
                            <button
                                onClick={closeAssignAgentModal}
                                className="rounded-lg hover:underline"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-3 rounded-lg text-white bg-defaultOrange">
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col flex-1">
                <div className="flex gap-x-4 items-center">
                    <Link to={`/`} className="text-sm opacity-60">
                        Dashboard
                    </Link>
                    <FaChevronRight size={18} />
                    <Link to={`/products`} className="text-sm opacity-60">
                        Products
                    </Link>
                    <FaChevronRight size={18} />
                    <span className="text-sm">Product Details</span>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <h1 className="text-3xl font-bold">Product Details</h1>

                    {state?.fieldAgent ? (
                        <button
                            onClick={openAssignAgentModal}
                            className="px-4 py-2.5 rounded-lg text-sm text-white bg-defaultOrange hover:bg-defaultOrangeHover"
                        >
                            Assign Field Agent
                        </button>
                    ) : (
                        <div className="flex gap-x-8 items-center">
                            <CiEdit
                                color="#e65800"
                                size={26}
                                className="cursor-pointer"
                                title="Edit"
                            />
                            <BsTrash3
                                color="#e65800"
                                size={24}
                                className="cursor-pointer"
                                title="Delete"
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-x-5 mt-10">
                    <div className="w-2/4 flex flex-col items-center gap-y-5">
                        <img
                            className="h-[430px] w-[85%] rounded-[32px] object-contain bg-black/15"
                            src={Car}
                            alt="Product"
                        />

                        <div className="w-[70%] grid grid-cols-4 gap-x-3 gap-y-3">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <img
                                    key={num}
                                    className="h-[64px] w-full rounded-lg object-contain cursor-pointer bg-black/15"
                                    src={Car}
                                    alt="Product"
                                />
                            ))}
                        </div>
                    </div>
                    {/* Images */}

                    <div className="w-2/4 flex flex-col gap-y-6">
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Product Name:
                            </span>
                            <span className="opacity-70 text-sm">
                                Toyota Camry LE (2024)
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Category:
                            </span>
                            <span className="opacity-70 text-sm">Car</span>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Status:
                            </span>
                            <span className="opacity-70 text-sm">Active</span>
                        </div>
                        <div className="w-full flex flex-col gap-y-1.5">
                            <span className="text-sm font-semibold">
                                Description:
                            </span>
                            <span className="opacity-70 text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit reiciendis voluptas
                                laboriosam, suscipit debitis, iusto aliquam
                                optio commodi autem atque hic eveniet error
                                eaque quibusdam.
                            </span>
                        </div>
                        <div className="w-full flex gap-x-2 items-start">
                            <div className="w-2/4">
                                <span className="text-sm font-semibold">
                                    Key Features:
                                </span>
                                <ul className="text-sm flex flex-col gap-y-2 mt-2.5 list-disc">
                                    <li className="opacity-70">
                                        Engine: 2.5L 4-cylinder
                                    </li>
                                    <li className="opacity-70">
                                        Transmission: Automatic
                                    </li>
                                    <li className="opacity-70">
                                        Mileage: 30,000 miles
                                    </li>
                                    <li className="opacity-70">
                                        Color: Metallic Grey
                                    </li>
                                    <li className="opacity-70">
                                        Fuel Type: Petrol
                                    </li>
                                    <li className="opacity-70">
                                        Condition: Used
                                    </li>
                                </ul>
                            </div>
                            <div className="w-2/4">
                                <span className="text-sm font-semibold">
                                    Pricing and Availabilty:
                                </span>
                                <ul className="text-sm flex flex-col gap-y-2 mt-2.5 list-disc">
                                    <li className="opacity-70">
                                        Price: $5,500,000
                                    </li>
                                    <li className="opacity-70">
                                        Negotiable: No
                                    </li>
                                    <li className="opacity-70">
                                        Location: Lekki, Lagos
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Seller's Name:
                            </span>
                            <span className="opacity-70 text-sm">
                                Distress Sales
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Contact Number:
                            </span>
                            <span className="opacity-70 text-sm">
                                +234 701 234 5678
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Upload Date:
                            </span>
                            <span className="opacity-70 text-sm">
                                March 15, 2024
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Product ID:
                            </span>
                            <span className="opacity-70 text-sm">
                                CAR123456
                            </span>
                        </div>
                    </div>
                    {/* details */}
                </div>
            </div>
        </div>
    )
}
