import { GrLocation } from "react-icons/gr"
import RecentCars from "../assets/Dashboard-listing-car.png"
import RecentHouse from "../assets/Dashboard-listing-house.png"

export default function DashboardRecentListings() {
    return (
        <>
            <h2 className="text-3xl font-bold">Recent Listings</h2>

            <div className="mt-10 flex items-center justify-between gap-x-5">
                <div className="basis-[27%] bg-[#FAFAFA] rounded-[8px] grid grid-cols-2 gap-x-2 gap-y-5 p-4">
                    {[1, 2, 3, 4].map((num) => (
                        <div
                            key={num}
                            className="w-full flex flex-col items-center gap-y-2.5 rounded-t-[8px] text-[#454545]"
                        >
                            <img
                                className="h-[130px] w-full rounded-[8px] object-fill bg-[#D9D9D9]"
                                src={RecentCars}
                                alt="dummy data"
                            />
                            <p className="text-sm text-center font-medium text-defaultOrange">
                                $10,500,000
                            </p>
                            <p className="text-center text-sm line-clamp-1">
                                2023 Toyota Camry XLE
                            </p>
                            <div className="flex gap-x-1.5 items-center text-sm">
                                <GrLocation size={24} color="#e65800" />
                                <span>Lekki, Lagos</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="basis-[46%] bg-[#FAFAFA] rounded-[8px] grid grid-cols-3 gap-x-2 gap-y-5 p-4">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div
                            key={num}
                            className="w-full flex flex-col items-center gap-y-2.5 rounded-t-[8px] text-[#454545]"
                        >
                            <img
                                className="h-[130px] w-full rounded-[8px] object-fill bg-[#D9D9D9]"
                                src={RecentHouse}
                                alt="dummy data"
                            />
                            <p className="text-sm text-center font-medium text-defaultOrange">
                                $10,500,000
                            </p>
                            <p className="text-center text-sm line-clamp-1">
                                5-Bedroom Detached House
                            </p>
                            <div className="flex gap-x-1.5 items-center text-sm">
                                <GrLocation size={24} color="#e65800" />
                                <span>Lekki, Lagos</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="basis-[27%] bg-[#FAFAFA] rounded-[8px] grid grid-cols-2 gap-x-2 gap-y-5 p-4">
                    {[1, 2, 3, 4].map((num) => (
                        <div
                            key={num}
                            className="w-full flex flex-col items-center gap-y-2.5 rounded-t-[8px] text-[#454545]"
                        >
                            <img
                                className="h-[130px] w-full rounded-[8px] object-fill bg-[#D9D9D9]"
                                src={RecentCars}
                                alt="dummy data"
                            />
                            <p className="text-sm text-center font-medium text-defaultOrange">
                                $10,500,000
                            </p>
                            <p className="text-center text-sm line-clamp-1">
                                2023 Toyota Camry XLE
                            </p>
                            <div className="flex gap-x-1.5 items-center text-sm">
                                <GrLocation size={24} color="#e65800" />
                                <span>Lekki, Lagos</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
