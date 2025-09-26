import DashboardSearchBar from "../components/DashboardSearchBar";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import auctionService from "../api/services/auction.service";
import { toast } from "react-toastify";
import { Spinner } from "../components/common/spinner";
import formatDateToYYYYMMDD from "../helper/formatDate";
import { AddAuctionForm } from "../components/add-auction";
import { appendCreateDataField } from "../helper/AppendFormData";

export default function AddAuction() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialAuctionDetails: Auction = {
    name: "",
    type: "LAND",
    description: "",
    category_id: "2",
    sku: "",
    price: "",
    // sale_price: "",
    inventory: 0,
    media: [],
    documents: [],
    status: "draft",
    starting_bid: "",
    reserve_price: "",
    start_time: "",
    end_time: "",
    tags: [],
    data: [],
    incremental_bid_amount: "",
    minimum_bid_increment: "",
    auto_extend: "0",
  };
  const [auctionDetails, setAuctionDetails] = useState<Auction>(
    initialAuctionDetails
  );
  const [date, setDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [time, setTime] = useState<{
    start: string | number;
    end: string | number;
  }>({
    start: "",
    end: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAuctionDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // console.log("Product Details:", auctionDetails);

    if (!date.start || !date.end) {
      toast.error("Please select both start and end dates.");
      return;
    }
    const fullStartTime = `${formatDateToYYYYMMDD(date.start)} ${
      time.start || "00"
    }:00`;
    const fullEndTime = `${formatDateToYYYYMMDD(date.end)} ${
      time.end || "00"
    }:00`;
    const apiData = {
      ...auctionDetails,
      start_time: fullStartTime,
      end_time: fullEndTime,
      inventory: String(auctionDetails.inventory),
    };

    // Convert to FormData
    const formData = new FormData();

    for (const [key, value] of Object.entries(apiData)) {
      const success = appendCreateDataField(formData, key, value);
      if (!success) return; // stops on validation error
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      setIsLoading(true);
      const response = await auctionService.addAuction(formData);

      if (response.status === 201) {
        toast.success("Auction created successfully!");
        setAuctionDetails(initialAuctionDetails);
      }
    } catch (err: any) {
      toast.error(() => {
        switch (err.status) {
          case 422: {
            const errors = err.response.data.errors;
            const secondKey = Object.keys(errors)[0];
            const message = errors[secondKey][0];
            return ` ${message}`;
          }
          case 500:
            return `Failed to create product.\nCheck your internet connection`;
          default:
            return "An error occurred. Please try again.";
        }
      });
      console.error("Error adding auction product:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    // Reset auction details or navigate away
    setIsLoading(false);
    setAuctionDetails(initialAuctionDetails);
    navigate("/admin/auctions");
  };

  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-4 md:px-14 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-4 md:px-14 w-full mt-4 flex flex-col flex-1">
        <div className="flex gap-x-4 items-center">
          <Link to="/auctions" className="text-sm opacity-60">
            Auctions
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Auction</span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <h1 className="text-3xl font-bold">Add Auction</h1>
          <div className="flex gap-x-5 items-center">
            <button
              onClick={handleCancel}
              className="text-sm text-defaultOrange hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-3 rounded-lg text-sm bg-defaultOrange hover:bg-defaultOrangeHover text-white"
            >
              {isLoading ? <Spinner /> : "Publish"}
            </button>
          </div>
        </div>

        <main className="w-full flex flex-col md:flex-row items-start gap-y-5 gap-x-8 mt-8">
          <AddAuctionForm
            auctionDetails={auctionDetails}
            setAuctionDetails={setAuctionDetails}
            handleInputChange={handleInputChange}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
          />
        </main>
      </div>
    </div>
  );
}
