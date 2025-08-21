import { FaChevronRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
// import Car2 from "../assets/Dashboard-listing-car.png";
import DashboardSearchBar from "../components/DashboardSearchBar";
import ProductCarousel from "../components/ProductCarousel";
// import { generateRandomNumber } from "../helper/helperFunctions";
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

const images = [image1, image2, image3, image4];

export default function AuctionDetails() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      if (id) {
        try {
          const response = await auctionService.getAuction(parseInt(id));
          console.log("Auction details:", response);
          setAuction(response.data);
        } catch (error) {
          console.error("Error fetching auction details:", error);
        }
      } else {
        console.error("Auction ID is undefined.");
      }
    };

    fetchAuctionDetails();
  }, [id]);

  const [auctionData, setAuctionData] = usePaginatedData(
    auctionService.getAllAuctions,
    {
      initialPage: 1,
      initialPageSize: 10,
      dataName: "Auctions",
    }
  );

  return (
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
            <ProductCarousel images={images} />
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
                <span className="text-[50px] font-bold text-[#21C45D]">
                  N{formatPrice(Number(auction.price))}
                </span>
              </div>
            </div>

            {/* count down section */}
            <div className="w-full bg-white space-y-6 flex flex-col rounded-xl p-6">
              <span className="text-secondaryTextColor">
                Count Down Duration:
              </span>
              <div className="flex items-center text-[#FF0000] gap-x-2">
                <div className="flex flex-col items-center gap-y-1">
                  <span className="text-[40px] font-bold">48</span>
                  <span className="text-secondaryTextColor">Hours</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center  gap-y-1">
                  <span className="text-[40px] font-bold">21</span>
                  <span className="text-secondaryTextColor">Min</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center  gap-y-1">
                  <span className="text-[40px] font-bold">09</span>
                  <span className="text-secondaryTextColor">Secs</span>
                </div>
              </div>
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
