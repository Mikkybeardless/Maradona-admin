import { useState } from "react"
import { FaTimes } from "react-icons/fa"

type ShipmentModalType = {
    setShipmentModal: React.Dispatch<React.SetStateAction<boolean>>
    shipmentModalRef: React.RefObject<HTMLDivElement>
}

export default function ShipmentModal({
    setShipmentModal,
    shipmentModalRef,
}: ShipmentModalType) {
    const [phase, setPhase] = useState("Car")

    return (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
            <div
                ref={shipmentModalRef}
                className="w-[70%] h-[90%] rounded-2xl flex bg-white"
            >
                <div className="w-[15%] flex flex-col p-5 rounded-l-2xl bg-[#F4F1F3] border-r border-r-primaryBorder">
                    <h3 className="text-xl font-semibold">Select Item</h3>
                    <div className="flex flex-col gap-y-2 text-sm mt-5">
                        <button
                            className={`${
                                phase === "Car"
                                    ? "text-white bg-defaultOrange"
                                    : "hover:bg-defaultOrangeHover/10"
                            } w-full py-2.5 rounded-lg font-semibold`}
                            onClick={() => setPhase("Car")}
                        >
                            Car
                        </button>
                        <button
                            className={`${
                                phase === "House"
                                    ? "text-white bg-defaultOrange"
                                    : "hover:bg-defaultOrangeHover/10"
                            } w-full py-2.5 rounded-lg font-semibold`}
                            onClick={() => setPhase("House")}
                        >
                            House
                        </button>
                        <button
                            className={`${
                                phase === "Land"
                                    ? "text-white bg-defaultOrange"
                                    : "hover:bg-defaultOrangeHover/10"
                            } w-full py-2.5 rounded-lg font-semibold`}
                            onClick={() => setPhase("Land")}
                        >
                            Land
                        </button>
                    </div>
                </div>

                <div className="w-[85%] flex flex-col">
                    <div className="w-full py-4 px-8 flex justify-between items-center border-b border-b-primaryBorder">
                        <h1 className="text-2xl font-bold">New Order</h1>
                        <button
                            onClick={() => setShipmentModal(false)}
                            className="p-3 rounded-full bg-[#F4F1F3]"
                        >
                            <FaTimes size={16} />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col px-8 pt-4 overflow-y-auto custom-scrollbar">
                        {phase === "Car" ? (
                            <>
                                <h4 className="text-lg font-medium">
                                    Car Shipment Details
                                </h4>
                                <div className="grid grid-cols-3 gap-x-4 gap-y-5 w-full mt-4 text-sm">
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Order ID:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Item Type:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Item Title:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Country:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Region:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">City:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Address:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Zip Code:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">E.D.D:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Vehicle Make:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Vehicle Model:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Year:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">VIN:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Condition:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Transport Type:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Insurance:</label>
                                        <div className="flex gap-x-3">
                                            <div className="flex gap-x-1 5">
                                                <input
                                                    className="size-[18px]"
                                                    type="checkbox"
                                                    id="Yes"
                                                />
                                                <label
                                                    htmlFor="Yes"
                                                    className=""
                                                >
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="flex gap-x-1 5">
                                                <input
                                                    className="size-[18px]"
                                                    type="checkbox"
                                                    id="No"
                                                />
                                                <label
                                                    htmlFor="No"
                                                    className=""
                                                >
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : phase === "House" ? (
                            <>
                                <h4 className="text-lg font-medium">
                                    House Sale Details
                                </h4>
                                <div className="grid grid-cols-3 gap-x-4 gap-y-5 w-full mt-4 text-sm">
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Transfer Date:
                                        </label>
                                        <input
                                            type="date"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Transfer time:
                                        </label>
                                        <input
                                            type="time"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Property Address:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Country:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Region:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">City:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Address:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Zip Code:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            New Owner's full name:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Email:</label>
                                        <input
                                            type="email"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Phone Number:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                </div>
                                <h4 className="text-lg font-medium mt-4">
                                    Property Details
                                </h4>
                                <div className="grid grid-cols-3 gap-x-4 gap-y-5 w-full mt-4 text-sm">
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Number of Bedrooms:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Number of Bathrooms:
                                        </label>
                                        <input
                                            type="time"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Square Footage:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Plot size:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Condition:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1.5 mt-4">
                                    <h4 className="text-lg font-medium mt-4">
                                        Legal Documents
                                    </h4>
                                    <div className="flex gap-x-3 text-sm">
                                        <div className="flex gap-x-1 5">
                                            <input
                                                className="size-[18px]"
                                                type="checkbox"
                                                id="deed"
                                            />
                                            <label htmlFor="deed" className="">
                                                Deed Transfer
                                            </label>
                                        </div>
                                        <div className="flex gap-x-1 5">
                                            <input
                                                className="size-[18px]"
                                                type="checkbox"
                                                id="inspection-report"
                                            />
                                            <label
                                                htmlFor="inspection-report"
                                                className=""
                                            >
                                                Inspection Report
                                            </label>
                                        </div>
                                        <div className="flex gap-x-1 5">
                                            <input
                                                className="size-[18px]"
                                                type="checkbox"
                                                id="home-warranty"
                                            />
                                            <label
                                                htmlFor="home-warranty"
                                                className=""
                                            >
                                                Home warranty
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : phase === "Land" ? (
                            <>
                                <h4 className="text-lg font-medium">
                                    Land Sale Details
                                </h4>
                                <div className="grid grid-cols-3 gap-x-4 gap-y-5 w-full mt-4 text-sm">
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Transfer Date:
                                        </label>
                                        <input
                                            type="date"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Transfer time:
                                        </label>
                                        <input
                                            type="time"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Property Address:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Country:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Region:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">City:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Address:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Zip Code:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            New Owner's full name:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Email:</label>
                                        <input
                                            type="email"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">
                                            Phone Number:
                                        </label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                </div>
                                <h4 className="text-lg font-medium mt-4">
                                    Property Details
                                </h4>
                                <div className="grid grid-cols-3 gap-x-4 gap-y-5 w-full mt-4 text-sm">
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Plot size:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Zoning:</label>
                                        <input
                                            type="time"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Condition:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1.5">
                                        <label className="">Lot size:</label>
                                        <input
                                            type="text"
                                            className="p-2.5 rounded-lg border border-primaryBorder outline-none"
                                            placeholder="Type"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1.5 mt-4">
                                    <h4 className="text-lg font-medium mt-4">
                                        Legal Documents
                                    </h4>
                                    <div className="flex gap-x-3 text-sm">
                                        <div className="flex gap-x-1 5">
                                            <input
                                                className="size-[18px]"
                                                type="checkbox"
                                                id="deed"
                                            />
                                            <label htmlFor="deed" className="">
                                                Title Transfer
                                            </label>
                                        </div>
                                        <div className="flex gap-x-1 5">
                                            <input
                                                className="size-[18px]"
                                                type="checkbox"
                                                id="inspection-report"
                                            />
                                            <label
                                                htmlFor="inspection-report"
                                                className=""
                                            >
                                                Survey Report
                                            </label>
                                        </div>
                                        <div className="flex gap-x-1 5">
                                            <input
                                                className="size-[18px]"
                                                type="checkbox"
                                                id="home-warranty"
                                            />
                                            <label
                                                htmlFor="home-warranty"
                                                className=""
                                            >
                                                Soil Test Report
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>

                    <div className="flex justify-end px-8 py-4">
                        <button className="ml-auto px-8 py-2.5 rounded-lg text-sm text-white bg-defaultOrange hover:bg-defaultOrangeHover">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
