import { FaChevronRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import ProductCarousel from "../components/ProductCarousel";
import MuiTableComponent from "../components/table/TableComponent";
import image1 from "../assets/detail1.png";
import image2 from "../assets/detail2.png";
import image3 from "../assets/detail3.png";
import image4 from "../assets/detail4.png";
import auctionService from "../api/services/auction.service";
import { useEffect, useState } from "react";
import { AuctionColumns } from "../components/table/columns";
import { usePaginatedData } from "../hooks/usePaginatedData";
import { formatPrice } from "../helper/helperFunctions";
import { DetailLoadingState } from "../components/common/detailLoadingState";

const images = [image1, image2, image3, image4];

export default function AuctionDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [auction, setAuction] = useState({
    name: "",
    type: "",
    description: "",
    category_id: "",
    sku: "",
    price: "",
    inventory: "",
    media: [],
    documents: [],
    status: "active",
    starting_bid: "",
    reserve_price: "",
    start_time: "",
    end_time: "",
    tags: [],
    incremental_bid_amount: "",
    minimum_bid_increment: "",
    auto_extend: "",
    winning_bid_id: "",
    seller_id: "",
    approved_by: "",
    approved_at: "",
    time_left: "",
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    isOpen: false,
  });

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      if (id) {
        try {
          const response = await auctionService.getAuction(parseInt(id));
          setAuction(response.data);
        } catch (error) {
          console.error("Error fetching auction details:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Auction ID is undefined.");
      }
    };

    fetchAuctionDetails();
  }, [id]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(auction.end_time).getTime();
      const start = new Date(auction.start_time).getTime();
      const isRunning = now > start && now < end;
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
          isOpen: isRunning,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          isOpen: false,
        });
      }
    };
    calculateTimeLeft();
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [auction]);
  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  const [auctionData, setAuctionData] = usePaginatedData(
    auctionService.getAllAuctions,
    {
      initialPage: 1,
      initialPageSize: 10,
      dataName: "Auctions",
    }
  );

  return isLoading ? (
    <DetailLoadingState message="Loading auction details..." />
  ) : (
    <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar py-20 bg-[#F5F5F5]">
      <div className="w-full py-5 px-5 md:px-10 fixed z-10 left-2 top-0 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-5 md:px-5 w-full mt-4 flex flex-col flex-1">
        <div className="flex gap-x-4 items-center">
          <Link to="/admin/auctions" className="text-sm opacity-60">
            Auctions
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Details</span>
        </div>

        <h1 className="text-3xl font-bold mt-6">Auction Details</h1>

        <div className="flex flex-col md:flex-row gap-x-8 md:justify-between mt-10">
          <div className="w-full md:w-2/4 flex flex-col gap-y-6">
            <ProductCarousel images={auction.media || images} />
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-y-1.5">
              <span className="text-sm font-semibold">Description</span>
              <span className="opacity-70 text-sm">
                {auction?.description}
                {/* A well-maintained Toyota Camry 2018 model with a sleek design
                and advanced features. Perfect for both city and highway
                driving. */}
              </span>
            </div>
          </div>
          {/* Images */}

          <div className="w-full md:w-2/4 flex flex-col gap-y-6">
            <div className="w-full bg-white space-y-6 flex flex-col rounded-xl p-6">
              <div className="space-y-2 flex flex-col">
                <span className="text-sm opacity-70 ">Product Name:</span>
                <span className=" text-2xl font-bold">{auction?.name}</span>
                <div className="w-full flex items-center gap-x-1">
                  <span className="opacity-70 text-[#008000] rounded-3xl bg-[#D3FFD3] px-2 py-1 text-sm">
                    {auction.status}
                  </span>
                  <div className="flex gap-1 bg-black text-white rounded-full px-2 py-1 text-xs font-semibold">
                    <span className="text-sm font-semibold">Category:</span>
                    <span className=" text-sm">{auction.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-1.5">
                <span className="text-secondaryTextColor">starting Price</span>
                <span className="text-3xl text-lightBlue">
                  N{formatPrice(Number(auction.starting_bid))}
                </span>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <span className="text-secondaryTextColor">Current Price</span>
                <span className="text-[35px] md:text-[50px] font-bold text-[#21C45D]">
                  N{formatPrice(Number(auction.price))}
                </span>
              </div>
            </div>

            {/* count down section */}
            <div className="w-full bg-white space-y-6 flex flex-col rounded-xl p-6">
              <span className="text-secondaryTextColor">
                Count Down Duration:
              </span>
              {timeLeft.isExpired ? (
                <div className="flex bg-[#F0F0F0] w-full text-red-500 items-center justify-center px-4 py-2">
                  <span className="text-lg font-bold"> Auction Closed</span>
                </div>
              ) : timeLeft.isOpen ? (
                <div className="flex items-center text-[#FF0000] gap-x-2">
                  <div className="flex flex-col items-center gap-y-1">
                    <span className="text-[40px] font-bold">
                      {formatTime(timeLeft.days)}
                    </span>
                    <span className="text-secondaryTextColor">Days</span>
                  </div>
                  <span className="text-secondaryTextColor text-xl font-extrabold">
                    :
                  </span>
                  <div className="flex flex-col items-center gap-y-1">
                    <span className="text-[40px] font-bold">
                      {formatTime(timeLeft.hours)}
                    </span>
                    <span className="text-secondaryTextColor">Hours</span>
                  </div>
                  <span className="text-secondaryTextColor text-xl font-extrabold">
                    :
                  </span>
                  <div className="flex flex-col items-center  gap-y-1">
                    <span className="text-[40px] font-bold">
                      {formatTime(timeLeft.minutes)}
                    </span>
                    <span className="text-secondaryTextColor">Min</span>
                  </div>
                  <span className="text-secondaryTextColor text-xl font-extrabold">
                    :
                  </span>
                  <div className="flex flex-col items-center  gap-y-1">
                    <span className="text-[40px] font-bold">
                      {formatTime(timeLeft.seconds)}
                    </span>
                    <span className="text-secondaryTextColor">Secs</span>
                  </div>
                </div>
              ) : (
                <div className="flex bg-[#F0F0F0] w-full text-red-500 items-center justify-center px-4 py-2">
                  <span className="text-lg font-bold"> Not yet started</span>
                </div>
              )}
            </div>

            {/* key feature  */}
            <div className="w-full  p-4 pl-7 rounded-xl flex gap-x-2 items-start">
              <div className="w-2/4">
                <span className="text-sm font-semibold">Key Features</span>
                <ul className="text-sm pl-3 flex flex-col gap-y-2 mt-2.5 list-disc">
                  <li className="opacity-70">Engine: 2.5L 4-cylinder</li>
                  <li className="opacity-70">Transmission: Automatic</li>
                  <li className="opacity-70">Mileage: 30,000 miles</li>
                  <li className="opacity-70">Color: Metallic Grey</li>
                  <li className="opacity-70">Fuel Type: Petrol</li>
                  <li className="opacity-70">Condition: Used</li>
                </ul>
              </div>
              <div className="w-2/4">
                <span className="text-sm font-semibold">
                  Pricing and Availabilty
                </span>
                <ul className="text-sm flex flex-col gap-y-2 mt-2.5 list-none">
                  <li className="opacity-70">Price: $5,500,000</li>
                  <li className="opacity-70">Negotiable: No</li>
                  <li className="opacity-70">Location: Lekki, Lagos</li>
                </ul>
              </div>
            </div>
          </div>
          {/* details */}
        </div>
      </div>

      {/* table */}
      <section
        id="auction table"
        className="mt-10  px-5 md:px-10 min-h-[500px] flex flex-1 w-full overflow-hidden"
      >
        <MuiTableComponent
          columns={AuctionColumns}
          showCheckbox={false}
          rows={auctionData.rows}
          rowHeight={60}
          loading={auctionData.loading}
          currentPage={auctionData.pagination.page}
          pageSize={auctionData.pagination.pageSize}
          onPageChange={(model) => {
            setAuctionData((prev) => ({
              ...prev,
              pagination: {
                page: model.page,
                pageSize: model.pageSize,
              },
            }));
          }}
          headerStyle={{
            backgroundColor: "#f3f4f6",
            fontWeight: "bold",
          }}
          totalRowCount={auctionData.totalRowCount}
        />
      </section>
    </div>
  );
}
