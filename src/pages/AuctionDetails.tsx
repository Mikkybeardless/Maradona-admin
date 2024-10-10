import { FaChevronRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
import Car from "../assets/Product-page-car.png"
import DashboardSearchBar from "../components/DashboardSearchBar"

export default function AuctionDetails() {
    return (
        <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar pb-10 bg-[#F5F5F5]">
            <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col flex-1">
                <div className="flex gap-x-4 items-center">
                    <Link to="/auctions" className="text-sm opacity-60">
                        Auctions
                    </Link>
                    <FaChevronRight size={18} />
                    <span className="text-sm">Details</span>
                </div>

                <h1 className="text-3xl font-bold mt-6">Product Details</h1>

                <div className="flex gap-x-8 mt-10">
                    <div className="w-2/4 flex flex-col items-center gap-y-5">
                        <img
                            className="h-[430px] w-[90%] rounded-[32px] object-contain bg-black/15"
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
                                Auction Title:
                            </span>
                            <span className="opacity-70 text-sm max-w-[65%]">
                                Toyota Camry LE (2024)
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Item Details:
                            </span>
                            <span className="opacity-70 text-sm max-w-[65%]">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Facilis, hic.
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Category:
                            </span>
                            <span className="opacity-70 text-sm max-w-[65%]">
                                Car
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Status:
                            </span>
                            <span className="opacity-70 text-sm max-w-[65%]">
                                Active
                            </span>
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
                        <div className="w-full flex justify-between items-center gap-x-2">
                            <span className="text-sm font-semibold">
                                Uploaded:
                            </span>
                            <span className="opacity-70 text-sm max-w-[65%]">
                                {new Date().toString()}
                            </span>
                        </div>
                        <div className="w-full mt-8">
                            <span className="font-semibold">
                                Bidding Information:
                            </span>
                            <div className="flex flex-col mt-5 gap-y-5">
                                <div className="w-full flex justify-between items-center gap-x-2">
                                    <span className="text-sm font-medium flex-shrink-0">
                                        Current Highest Bid:
                                    </span>
                                    <span className="text-sm max-w-[65%] font-medium text-defaultOrange flex-shrink-0">
                                        $25,000
                                    </span>
                                    <span className="text-sm">
                                        Bidder John Doe
                                    </span>
                                </div>
                                <div className="w-full flex justify-between items-center gap-x-2">
                                    <span className="text-sm font-medium">
                                        Total Bids Received:
                                    </span>
                                    <span className="text-sm max-w-[65%] font-medium text-defaultOrange">
                                        15
                                    </span>
                                </div>
                                <div className="w-full flex justify-between items-center gap-x-2">
                                    <span className="text-sm font-medium">
                                        Reserve Price:
                                    </span>
                                    <span className="flex items-baseline gap-x-1 opacity-70 text-sm max-w-[65%]">
                                        <span className="flex-shrink-0">
                                            Met
                                        </span>
                                        <span className="text-xs">
                                            (The reserve price set by the seller
                                            has been reached)
                                        </span>
                                    </span>
                                </div>
                                <div className="w-full flex justify-between items-center gap-x-2">
                                    <span className="text-sm font-medium">
                                        Time Remaining:
                                    </span>
                                    <span className="flex items-baseline gap-x-1 whitespace-pre-line opacity-70 text-sm max-w-[65%]">
                                        <span className="flex-shrink-0">
                                            3 hours, 45 minutes{" "}
                                        </span>
                                        <span className="text-xs">
                                            (Countdown timer showing the time
                                            left until the auction ends)
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center gap-x-2 mt-8">
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
