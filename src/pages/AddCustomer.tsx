import { useState } from "react"
import DashboardSearchBar from "../components/DashboardSearchBar"
import { PhoneInput } from "react-international-phone"
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"
import "react-international-phone/style.css"

export default function AddCustomer() {
    const [phone, setPhone] = useState<any>()
    const [country, setCountry] = useState("")
    const [region, setRegion] = useState("")

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
            <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col items-center flex-1">
                <h1 className="text-3xl w-full font-bold flex items-start">
                    Add Customer
                </h1>

                <div className="w-[70%] flex flex-col gap-y-6 p-5 mt-6 rounded-lg border border-primaryBorder bg-white">
                    <h3 className="text-lg font-semibold">Basic details</h3>

                    <div className="w-full grid grid-cols-2 gap-x-6">
                        <div className="flex flex-col gap-y-1.5">
                            <label className="text-sm">First name:</label>
                            <input
                                type="text"
                                className="rounded-lg p-3 outline-none border border-primaryBorder"
                                placeholder="First name"
                            />
                        </div>
                        <div className="flex flex-col gap-y-1.5">
                            <label className="text-sm">Last name:</label>
                            <input
                                type="text"
                                className="rounded-lg p-3 outline-none border border-primaryBorder"
                                placeholder="Last name"
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-y-1.5">
                        <label className="text-sm">Email:</label>
                        <input
                            type="text"
                            className="rounded-lg p-3 outline-none border border-primaryBorder"
                            placeholder="Email address"
                        />
                    </div>

                    <div className="w-full flex items-end gap-x-6">
                        <PhoneInput
                            className="!w-full gap-x-5"
                            countrySelectorStyleProps={{
                                className: "w-[20%]",
                                buttonClassName:
                                    "!h-[auto] w-full py-3 !rounded-lg",
                            }}
                            defaultCountry="ng"
                            onChange={setPhone}
                            value={phone}
                            inputClassName="w-full !h-[unset] !py-3 !rounded-lg outline-none !border !border-primaryBorder !text-base"
                        />
                    </div>
                </div>
                {/* basic details */}

                <div className="w-[70%] flex flex-col gap-y-6 p-5 mt-6 rounded-lg border border-primaryBorder bg-white">
                    <div className="flex flex-col gap-y-1 5">
                        <h3 className="text-lg font-semibold">
                            Shipping & Delivery
                        </h3>
                        <span className="text-sm">
                            The adddress that will be used for the delivery of
                            your goods
                        </span>
                    </div>

                    <div className="w-full flex flex-col gap-y-1.5">
                        <label className="text-sm">Country:</label>
                        <CountryDropdown
                            classes="rounded-lg p-3 outline-none border border-primaryBorder"
                            value={country}
                            onChange={(val) => setCountry(val)}
                        />
                    </div>

                    <div className="w-full flex flex-col gap-y-1.5">
                        <label className="text-sm">Region:</label>
                        <RegionDropdown
                            classes="rounded-lg p-3 outline-none border border-primaryBorder"
                            country={country}
                            value={region}
                            onChange={(val) => setRegion(val)}
                        />
                    </div>

                    <div className="flex flex-col gap-y-1.5">
                        <label className="text-sm">Address:</label>
                        <input
                            type="text"
                            className="rounded-lg p-3 outline-none border border-primaryBorder"
                            placeholder="Address"
                        />
                    </div>
                </div>

                <div className="w-[70%] flex justify-end items-center gap-x-5 mt-6">
                    <button className="px-4 py-2.5 text-sm rounded-lg border border-defaultOrange text-defaultOrange">
                        Cancel
                    </button>
                    <button className="px-4 py-2.5 text-sm rounded-lg bg-defaultOrange text-white">
                        Save customer
                    </button>
                </div>
            </div>
        </div>
    )
}
